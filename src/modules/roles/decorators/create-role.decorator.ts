import { AuthGuard } from '@nestjs/passport';
import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCreateRole } from '../docs/create-role.doc';

export const CreateRoleDecorator = () => {
  return applyDecorators(UseGuards(AuthGuard('jwt')), Post(), ApiCreateRole());
};
