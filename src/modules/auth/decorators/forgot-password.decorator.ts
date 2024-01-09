import { HttpCode, HttpStatus, Post, applyDecorators } from '@nestjs/common';
import { ApiForgetPassword } from '../docs/forgot-password.doc';
import { Public } from 'src/common/decorators/public.decorator';

export const ForgotPasswordDecorator = () => {
  return applyDecorators(
    ApiForgetPassword(),
    Public(),
    Post('forgot-password'),
    HttpCode(HttpStatus.OK),
  );
};
