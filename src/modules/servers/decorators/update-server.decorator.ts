import { AuthGuard } from '@nestjs/passport';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiUpdateServer } from '../docs/update-server.dto';

export const UpdateServerDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    ApiUpdateServer(),
    UseGuards(AuthGuard('jwt')),
  );
};
