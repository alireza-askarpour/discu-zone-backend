import {
  Res,
  Req,
  Post,
  Body,
  HttpStatus,
  Controller,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as cookieSignature from 'cookie-signature';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';

import { LoginDecorator } from './decorators/login.decorator';
import { SignupDecorator } from './decorators/singup.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Origin } from 'src/common/decorators/origin.decorator';

import { isNull, isUndefined } from 'src/common/utils/validation.util';
import { EmailDto } from './interfaces/email.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly testing: boolean;
  private readonly cookieName: string;
  private readonly refreshTime: number;
  private readonly cookiePath = '/api/auth';

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.testing = this.configService.get<boolean>('testing');
    this.cookieName = this.configService.get<string>('REFRESH_COOKIE');
    this.refreshTime = this.configService.get<number>('jwt.refresh.time');
  }

  @Public()
  @Post('/signup')
  public async signUp(
    @Origin() origin: string | undefined,
    @Body() signUpDto: SignUpDto,
  ) {
    return await this.authService.signup(signUpDto, origin);
  }

  @Public()
  @Post('/confirm-email')
  async confirmEmail(
    @Origin() origin: string | undefined,
    @Body() confirmEmailDto: ConfirmEmailDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.confirmEmail(confirmEmailDto);
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(result);
  }

  @Post('login')
  @Post('/confirm-email')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Origin() origin: string | undefined,
    @Body() loginDto: LoginDto,
  ) {
    const result = await this.authService.login(loginDto);
    console.log('result.refreshToken: ', result.refreshToken);
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(result);
  }

  @Public()
  @Post('/refresh-access')
  public async refreshAccess(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const token = this.refreshTokenFromReq(req);
    console.log('test');
    const result = await this.authService.refreshTokenAccess(
      token,
      req.headers.origin,
    );
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(result);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(
    @Origin() origin: string | undefined,
    @Body() emailDto: EmailDto,
  ): Promise<any> {
    return this.authService.resetPasswordEmail(emailDto, origin);
  }

  private refreshTokenFromReq(req: Request): string {
    const token: string | undefined = req.cookies[this.cookieName];

    console.log({ tokens: req.cookies });
    if (isUndefined(token) || isNull(token)) {
      throw new UnauthorizedException();
    }
    const cookieSecret = this.configService.get<string>('COOKIE_SECRET');
    const value = cookieSignature.unsign(token, cookieSecret);
    console.log({ value });
    // const { valid, value } = result;

    if (!value) {
      throw new UnauthorizedException();
    }

    return value;
  }

  private xsaveRefreshCookie(res: Response, refreshToken: string) {
    return res
      .cookie(this.cookieName, refreshToken, {
        secure: !this.testing,
        httpOnly: true,
        signed: true,
        path: this.cookiePath,
        expires: new Date(Date.now() + this.refreshTime * 1000),
      })
      .header('Content-Type', 'application/json');
  }

  private saveRefreshCookie(res: Response, refreshToken: string): Response {
    console.log(132, { refreshToken });
    return res.cookie(this.cookieName, refreshToken, {
      secure: false,
      httpOnly: true,
      signed: true,
      path: this.cookiePath,
      expires: new Date(Date.now() + this.refreshTime * 1000),
    });

    // .header('Content-Type', 'application/json');
  }
}
