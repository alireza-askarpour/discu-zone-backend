import { AuthGuard } from '@nestjs/passport';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiGetRoles } from '../docs/get-roles.doc';

export const GetRolesDecoratpr = () => {
  return applyDecorators(
    // UseGuards(AuthGuard('jwt')),
    Get(),
    ApiGetRoles(),
  );
};
