import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiSignup } from '../docs/signup.doc';

export const SignupDecorator = () => {
  return applyDecorators(ApiSignup(), Post('signup'));
};
