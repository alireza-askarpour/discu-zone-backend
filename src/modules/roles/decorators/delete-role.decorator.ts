import { AuthGuard } from '@nestjs/passport';
import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiDeleteRole } from '../docs/delete-role.doc';

export const DeleteRoleDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    Delete(':id'),
    ApiDeleteRole(),
  );
};
