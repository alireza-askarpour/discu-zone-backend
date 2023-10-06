import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiSignup } from '../docs/signup.doc';
import { DoesUserExist } from 'src/common/guards/doesUserExist.guard';

export const SignupDecorator = () => {
  return applyDecorators(ApiSignup(), UseGuards(DoesUserExist), Post('signup'));
};
