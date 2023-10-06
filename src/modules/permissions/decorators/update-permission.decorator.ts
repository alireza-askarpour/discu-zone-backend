import { Patch, applyDecorators } from '@nestjs/common';
import { ApiUpdatePermission } from '../docs/update-permission.doc';

export const UpdatePermissionDecorator = () => {
  return applyDecorators(Patch(':id'), ApiUpdatePermission());
};
