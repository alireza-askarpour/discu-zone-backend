import { ApiTags } from '@nestjs/swagger';
import { Request as _Request } from 'express';
import { Body, Controller, Request } from '@nestjs/common';

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
  async login(@Request() req: _Request, @Body() loginDto: LoginDto) {
    const payload = { id: req.user.id, email: req.user.email };
    return await this.authService.login(payload);
  }

  @SignupDecorator()
  async signUp(@Body() signupDto: SignUpDto) {
    return await this.authService.create(signupDto);
  }
}
