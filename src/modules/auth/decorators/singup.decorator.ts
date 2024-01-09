import { Post, applyDecorators } from '@nestjs/common';
import { ApiSignup } from '../docs/signup.doc';
import { Public } from 'src/common/decorators/public.decorator';

export const SignupDecorator = () => {
  return applyDecorators(ApiSignup(), Public(), Post('/signup'));
};
