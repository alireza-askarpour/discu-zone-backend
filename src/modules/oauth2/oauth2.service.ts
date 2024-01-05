import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

import { JwtService } from '../jwt/jwt.service';
import { OAuthClass } from './classes/oauth.class';
import { IClient } from './interfaces/client.interface';
import { CommonService } from 'src/common/common.service';
import { UsersRepository } from '../users/users.repository';
import { isNull } from 'src/common/utils/validation.util';
import { ICallbackQuery } from './interfaces/callback-query.interface';
import { OAuthProvidersEnum } from '../users/enums/oauth-providers.enum';

@Injectable()
export class Oauth2Service {
  private readonly [OAuthProvidersEnum.GOOGLE]: OAuthClass | null;
  private readonly [OAuthProvidersEnum.DISCORD]: OAuthClass | null;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly commonService: CommonService,
  ) {
    const url = this.configService.get<string>('url');
    this[OAuthProvidersEnum.GOOGLE] = Oauth2Service.setOAuthClass(
      OAuthProvidersEnum.GOOGLE,
      this.configService,
      url,
    );
    this[OAuthProvidersEnum.DISCORD] = Oauth2Service.setOAuthClass(
      OAuthProvidersEnum.DISCORD,
      this.configService,
      url,
    );
  }

  private static setOAuthClass(
    provider: OAuthProvidersEnum,
    configService: ConfigService,
    url: string,
  ): OAuthClass | null {
    const client = configService.get<IClient | null>(
      `oauth2.${provider.toLowerCase()}`,
    );

    if (isNull(client)) {
      return null;
    }
    return new OAuthClass(provider, client, url);
  }

  public async login(
    provider: OAuthProvidersEnum,
    email: string,
    displayName: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      this.usersRepository.create({ email, displayName, provider });
    }
    const [accessToken, refreshToken] =
      await this.jwtService.generateAuthTokens(user);

    return {
      refreshToken,
      accessToken,
    };
  }

  public getAuthorizationUrl(provider: OAuthProvidersEnum): string {
    return this.getOAuth(provider).authorizationUrl;
  }

  private getOAuth(provider: OAuthProvidersEnum): OAuthClass {
    const oauth = this[provider];
    if (isNull(oauth)) {
      throw new NotFoundException('Page not found');
    }

    return oauth;
  }

  public async getUserData<T extends Record<string, any>>(
    provider: OAuthProvidersEnum,
    cbQuery: ICallbackQuery,
  ): Promise<T> {
    const { code, state } = cbQuery;
    const accessToken = await this.getAccessToken(provider, code, state);

    const userData = await firstValueFrom(
      this.httpService
        .get<T>(this.getOAuth(provider).dataUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new UnauthorizedException(error.response.data);
          }),
        ),
    );
    return userData.data;
  }

  private async getAccessToken(
    provider: OAuthProvidersEnum,
    code: string,
    state: string,
  ): Promise<string> {
    const oauth = this.getOAuth(provider);
    if (state !== oauth.state) {
      throw new UnauthorizedException('Corrupted state');
    }
    return await this.commonService.throwInternalError(oauth.getToken(code));
  }
}
