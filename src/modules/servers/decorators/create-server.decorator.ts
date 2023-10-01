import { AuthGuard } from '@nestjs/passport';
import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCreateServer } from '../docs/create-server.dto';

export const CreateServerDecorator = () => {
  return applyDecorators(
    Post(),
    ApiCreateServer(),
    UseGuards(AuthGuard('jwt')),
  );
};
