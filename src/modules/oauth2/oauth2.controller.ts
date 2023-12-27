import {
  Get,
  Res,
  Query,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { Oauth2Service } from './oauth2.service';
import { OAuthFlagGuard } from './guards/oauth-flag.guard';
import { CallbackQueryDto } from './dtos/callback-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { OAuthProvidersEnum } from '../users/enums/oauth-providers.enum';
import {
  IGoogleUser,
  IDiscordUser,
} from './interfaces/user-response.interface';
import {
  ApiDiscordOauth,
  ApiDiscordCallbackOauth,
} from './docs/discord-oauth.doc';
import { ApiGoogleCallbackOAuth } from './docs/google-oauth.doc';

@ApiTags('Oauth2')
@Controller('auth/ext')
export class Oauth2Controller {
  private readonly url: string;
  private readonly cookiePath = '/api/auth';
  private readonly accessCookieName: string;
  private readonly refreshCookieName: string;
  private readonly accessTime: number;
  private readonly refreshTime: number;
  private readonly testing: boolean;

  constructor(
    private readonly oauth2Service: Oauth2Service,
    private readonly configService: ConfigService,
  ) {
    this.url = `https://${this.configService.get<string>('domain')}`;
    this.accessCookieName = this.configService.get<string>('REFRESH_COOKIE');
    this.refreshCookieName = this.configService.get<string>('ACCESS_COOKIE');
    this.refreshTime = this.configService.get<number>('jwt.refresh.time');
    this.accessTime = this.configService.get<number>('jwt.access.time');
    this.testing = this.configService.get<boolean>('testing');
  }

  @Public()
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GOOGLE))
  @Get('google')
  public google(@Res() res: Response) {
    return this.startRedirect(res, OAuthProvidersEnum.GOOGLE);
  }

  @Public()
  @ApiGoogleCallbackOAuth()
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GOOGLE))
  @Get('google/callback')
  public async googleCallback(
    @Query() cbQuery: CallbackQueryDto,
    @Res() res: Response,
  ): Promise<Response> {
    const provider = OAuthProvidersEnum.GOOGLE;
    const { name, email } = await this.oauth2Service.getUserData<IGoogleUser>(
      provider,
      cbQuery,
    );
    return this.loginAndRedirect(res, provider, email, name);
  }

  // DISCORD
  @Public()
  @ApiDiscordOauth()
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.DISCORD))
  @Get('discord')
  public discord(@Res() res: Response) {
    return this.startRedirect(res, OAuthProvidersEnum.DISCORD);
  }

  @Public()
  @ApiDiscordCallbackOauth()
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.DISCORD))
  @Get('discord/callback')
  public async discordCallback(
    @Query() cbQuery: CallbackQueryDto,
    @Res() res: Response,
  ) {
    const provider = OAuthProvidersEnum.DISCORD;
    const { username, email } =
      await this.oauth2Service.getUserData<IDiscordUser>(provider, cbQuery);
    return this.loginAndRedirect(res, provider, email, username);
  }

  private startRedirect(res: Response, provider: OAuthProvidersEnum) {
    return res
      .status(HttpStatus.TEMPORARY_REDIRECT)
      .redirect(this.oauth2Service.getAuthorizationUrl(provider));
  }

  private async loginAndRedirect(
    res: Response,
    provider: OAuthProvidersEnum,
    email: string,
    name: string,
  ): Promise<any> {
    const { accessToken, refreshToken } = await this.oauth2Service.login(
      provider,
      email,
      name,
    );
    return res
      .cookie(this.accessCookieName, accessToken, {
        secure: true,
        httpOnly: true,
      })
      .cookie(this.refreshCookieName, refreshToken, {
        secure: true,
        httpOnly: true,
      })
      .status(HttpStatus.PERMANENT_REDIRECT)
      .redirect(this.configService.get<string>('CLIENT_REDIRECT_URL'));
  }
}
