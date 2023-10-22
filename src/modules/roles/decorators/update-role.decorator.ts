import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUpdateRole } from '../docs/update-role.doc';

export const UpdateRoleDecorator = () => {
  return applyDecorators(
    // UseGuards(AuthGuard('jwt')),
    Patch(':id'),
    ApiUpdateRole(),
  );
};
