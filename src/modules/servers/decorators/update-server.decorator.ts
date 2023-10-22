import { AuthGuard } from '@nestjs/passport';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiUpdateServer } from '../docs/update-server.doc';

export const UpdateServerDecorator = () => {
  return applyDecorators(
    // UseGuards(AuthGuard('jwt')),
    ApiUpdateServer(),
    Patch(':id'),
  );
};
