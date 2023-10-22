import { AuthGuard } from '@nestjs/passport';
import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCreateInvite } from '../docs/create-invite.doc';

export const CreateInviteDecorator = () => {
  return applyDecorators(
    Post(':serverId'),
    ApiCreateInvite(),
    // UseGuards(AuthGuard('jwt')),
  );
};
