import {
  Res,
  Req,
  Post,
  Body,
  Patch,
  HttpStatus,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
// import * as cookieSignature from 'cookie-signature';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { EmailDto } from './interfaces/email.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

import { ApiLogout } from './docs/logout.doc';
import { ApiUpdatePassword } from './docs/update-password.doc';

import { LoginDecorator } from './decorators/login.decorator';
import { SignupDecorator } from './decorators/singup.decorator';
import { Origin } from 'src/common/decorators/origin.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ConfirmEmailDecorator } from './decorators/confirm-email.decorator';
import { RefreshTokenDecorator } from './decorators/refresh-access.decpratpr';
import { ResetPasswordDecorator } from './decorators/reset-password.decorator';
import { ForgotPasswordDecorator } from './decorators/forgot-password.decorator';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly testing: boolean;
  private readonly accessTime: number;
  private readonly refreshTime: number;
  private readonly cookiePath = '/api/auth';
  private readonly accessCookieName: string;
  private readonly refreshCookieName: string;
  private readonly isProductionMode: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.testing = this.configService.get<boolean>('testing');
    this.accessTime = this.configService.get<number>('jwt.access.time');
    this.refreshTime = this.configService.get<number>('jwt.refresh.time');
    this.accessCookieName = this.configService.get<string>('ACCESS_COOKIE');
    this.refreshCookieName = this.configService.get<string>('REFRESH_COOKIE');
    this.isProductionMode = this.configService.get('mode') === 'production';
  }

  @SignupDecorator()
  public async signUp(
    @Origin() origin: string | undefined,
    @Body() signUpDto: SignUpDto,
  ) {
    return await this.authService.signup(signUpDto, origin);
  }

  @ConfirmEmailDecorator()
  async confirmEmail(
    @Origin() origin: string | undefined,
    @Body() confirmEmailDto: ConfirmEmailDto,
    @Res() res: Response,
  ) {
    const { token, response } = await this.authService.confirmEmail(
      confirmEmailDto,
    );
    this.saveTokensInCookie(res, token.accessToken, token.refreshToken)
      .status(HttpStatus.OK)
      .send(response);
  }

  @LoginDecorator()
  async login(
    @Res() res: Response,
    @Origin() origin: string | undefined,
    @Body() loginDto: LoginDto,
  ) {
    const { token, response } = await this.authService.login(loginDto);
    this.saveTokensInCookie(res, token.accessToken, token.refreshToken)
      .status(HttpStatus.OK)
      .send(response);
  }

  @RefreshTokenDecorator()
  public async refreshAccess(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const [_, refreshToken] = this.refreshTokenFromReq(req);
    const { token, response } = await this.authService.refreshTokenAccess(
      refreshToken,
      req.headers.origin,
    );
    this.saveTokensInCookie(res, token.accessToken, token.refreshToken)
      .status(HttpStatus.OK)
      .send(response);
  }

  @ForgotPasswordDecorator()
  public async forgotPassword(
    @Origin() origin: string | undefined,
    @Body() emailDto: EmailDto,
  ): Promise<any> {
    return this.authService.resetPasswordEmail(emailDto, origin);
  }

  @ResetPasswordDecorator()
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiUpdatePassword()
  @Patch('/update-password')
  public async updatePassword(
    @Res() res: Response,
    @CurrentUser() userId: string,
    @Origin() origin: string | undefined,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const { token, response } = await this.authService.updatePassword(
      userId,
      changePasswordDto,
      origin,
    );

    this.saveTokensInCookie(res, token.accessToken, token.refreshToken)
      .status(HttpStatus.OK)
      .send(response);
  }

  @ApiLogout()
  @Post('/logout')
  public async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const [_, refreshToken] = this.refreshTokenFromReq(req);
    const message = await this.authService.logout(refreshToken);
    res
      .clearCookie(this.accessCookieName, { path: this.cookiePath })
      .clearCookie(this.refreshCookieName, { path: this.cookiePath })
      .header('Content-Type', 'application/json')
      .status(HttpStatus.OK)
      .json(message);
  }

  /***
   * Get accessToken and refreshToken from request
   */
  private refreshTokenFromReq(req: Request): string[] {
    const accessToken: string | undefined = req.cookies[this.accessCookieName];
    const refreshToken: string | undefined =
      req.cookies[this.refreshCookieName];

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException();
    }
    // const cookieSecret = this.configService.get<string>('COOKIE_SECRET');
    // const value = cookieSignature.unsign(token, cookieSecret);

    // if (!value) {
    //   throw new UnauthorizedException();
    // }

    return [accessToken, refreshToken];
  }

  /**
   * Save AccessToken and RefreshToken in cookie
   */
  private saveTokensInCookie(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): Response {
    return res
      .cookie(this.accessCookieName, accessToken, {
        secure: this.isProductionMode,
        httpOnly: true,
        path: this.cookiePath,
        expires: new Date(Date.now() + this.accessTime * 1000),
      })
      .cookie(this.refreshCookieName, refreshToken, {
        secure: this.isProductionMode,
        httpOnly: true,
        path: this.cookiePath,
        expires: new Date(Date.now() + this.refreshTime * 1000),
      })
      .header('Content-Type', 'application/json');
  }
}
