import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiLogin } from '../docs/login.doc';

export const LoginDecorator = () => {
  return applyDecorators(ApiLogin(), Post('login'));
};
