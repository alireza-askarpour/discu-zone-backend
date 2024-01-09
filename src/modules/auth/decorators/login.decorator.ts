import { Post, applyDecorators } from '@nestjs/common';
import { ApiLogin } from '../docs/login.doc';
import { Public } from 'src/common/decorators/public.decorator';

export const LoginDecorator = () => {
  return applyDecorators(ApiLogin(), Public(), Post('login'));
};
