import { AuthGuard } from '@nestjs/passport';
import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCreateServer } from '../docs/create-server.doc';

export const CreateServerDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiCreateServer(),
    Post(),
  );
};
