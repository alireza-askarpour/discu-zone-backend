import { Delete, applyDecorators } from '@nestjs/common';
import { ApiDeletePermission } from '../docs/delete-permission.doc';

export const DeletePermissionDecorator = () => {
  return applyDecorators(Delete(':id'), ApiDeletePermission());
};
