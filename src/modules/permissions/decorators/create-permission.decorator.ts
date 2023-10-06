import { Post, applyDecorators } from '@nestjs/common';
import { ApiCreatePermission } from '../docs/create-permission.doc';

export const CreatePermissionDecorator = () => {
  return applyDecorators(Post(), ApiCreatePermission());
};
