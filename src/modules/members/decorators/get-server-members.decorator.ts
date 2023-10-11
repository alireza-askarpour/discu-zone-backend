import { AuthGuard } from '@nestjs/passport';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiGetServerMembers } from '../docs/get-serevr-members.doc';

export const GetServerMembersDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiGetServerMembers(),
    Get('serverId'),
  );
};
