import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as _Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { ApiSignup } from './docs/signup.doc';
import { SignUpDto } from './dtos/signup.dto';
import { ApiLogin } from './docs/login.doc';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiLogin()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: _Request, @Body() loginDto: LoginDto) {
    return await this.authService.login(req.user.email);
  }

  @ApiSignup()
  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto) {
    return await this.authService.create(signupDto);
  }
}
