import { AuthGuard } from '@nestjs/passport';
import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiLogin } from '../docs/login.doc';

export const LoginDecorator = () => {
  return applyDecorators(
    ApiLogin(),
    UseGuards(AuthGuard('local')),
    Post('login'),
  );
};
