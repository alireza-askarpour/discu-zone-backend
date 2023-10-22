import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiJoinMemberToServer } from '../docs/join-member-to-server.doc';
import { AuthGuard } from '@nestjs/passport';

export const JoinMemberToServer = () => {
  return applyDecorators(
    Get(':slug'),
    ApiJoinMemberToServer(),
    // UseGuards(AuthGuard('jwt')),
  );
};
