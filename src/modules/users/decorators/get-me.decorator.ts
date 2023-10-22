import { AuthGuard } from '@nestjs/passport';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiGetMe } from '../docs/get-me.doc';

export const GetMeDecorator = () => {
  return applyDecorators(
    ApiGetMe(),
    // UseGuards(AuthGuard('jwt')),
    Get('@me'),
  );
};
