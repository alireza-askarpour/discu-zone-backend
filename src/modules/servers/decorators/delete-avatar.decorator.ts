import { AuthGuard } from '@nestjs/passport';
import { ApiDeleteAvatar } from '../docs/delete-avatar.doc';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';

export const DeleteAvatarDecorator = () => {
  return applyDecorators(
    // UseGuards(AuthGuard('jwt')),
    ApiDeleteAvatar(),
    Patch('delete-avatar/:id'),
  );
};
