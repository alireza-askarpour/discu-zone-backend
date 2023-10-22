import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';

import { LoginDecorator } from './decorators/login.decorator';
import { SignupDecorator } from './decorators/singup.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @LoginDecorator()
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    return await this.authService.login();
  }

  @SignupDecorator()
  async signUp(@Body() user: SignUpDto) {
    return await this.authService.signin(user);
  }
}
