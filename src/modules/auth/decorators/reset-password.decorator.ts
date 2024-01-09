import { HttpCode, HttpStatus, Post, applyDecorators } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiResetPassword } from '../docs/reset-password.doc';

export const ResetPasswordDecorator = () => {
  return applyDecorators(
    Public(),
    ApiResetPassword(),
    Post('/reset-password'),
    HttpCode(HttpStatus.OK),
  );
};
