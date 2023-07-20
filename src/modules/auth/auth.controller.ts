import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as _Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { ApiSignup } from './docs/signup.doc';
import { SignUpDto } from './dtos/signup.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: _Request) {
    return await this.authService.login(req.user);
  }

  @ApiSignup()
  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: SignUpDto) {
    console.log({ user })
    return user
    // return await this.authService.create(user);
  }
}
