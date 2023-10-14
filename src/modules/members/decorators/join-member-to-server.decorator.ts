import { Get, applyDecorators } from '@nestjs/common';
import { ApiJoinMemberToServer } from '../docs/join-member-to-server.doc';

export const JoinMemberToServer = () => {
  return applyDecorators(Get('slug'), ApiJoinMemberToServer());
};
