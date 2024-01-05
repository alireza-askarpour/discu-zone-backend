import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';

import { LoginDecorator } from './decorators/login.decorator';
import { SignupDecorator } from './decorators/singup.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Origin } from 'src/common/decorators/origin.decorator';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly cookiePath = '/api/auth';
  private readonly cookieName: string;
  private readonly refreshTime: number;
  private readonly testing: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.cookieName = this.configService.get<string>('REFRESH_COOKIE');
    this.refreshTime = this.configService.get<number>('jwt.refresh.time');
    this.testing = this.configService.get<boolean>('testing');
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
    @Res() res: Response,
    @Origin() origin: string | undefined,
    @Body() loginDto: LoginDto,
  ) {
    const result = await this.authService.login(loginDto);
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(result);
  }

  private saveRefreshCookie(res: Response, refreshToken: string) {
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
}
