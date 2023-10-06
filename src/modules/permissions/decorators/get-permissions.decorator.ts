import { Get, applyDecorators } from '@nestjs/common';
import { ApiGetPermissions } from '../docs/get-permissions.doc';

export const GetPermissionsDecorator = () => {
  return applyDecorators(Get(), ApiGetPermissions());
};
