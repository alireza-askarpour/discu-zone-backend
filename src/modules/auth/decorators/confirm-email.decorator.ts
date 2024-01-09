import { Post, applyDecorators } from '@nestjs/common';
import { ApiConfirmEmail } from '../docs/confirm-email.doc';
import { Public } from 'src/common/decorators/public.decorator';

export const ConfirmEmailDecorator = () =>
  applyDecorators(ApiConfirmEmail(), Public(), Post('/confirm-email'));
