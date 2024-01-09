import { Post, applyDecorators } from '@nestjs/common';
import { ApiRefreshAccess } from '../docs/refresh-access.doc';
import { Public } from 'src/common/decorators/public.decorator';

export const RefreshTokenDecorator = () => {
  return applyDecorators(ApiRefreshAccess(), Public(), Post('/refresh-access'));
};
