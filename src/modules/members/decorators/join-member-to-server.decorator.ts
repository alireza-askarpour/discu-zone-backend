import { Get, applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const JoinMemberToServer = () => {
  return applyDecorators(
    Get('slug'),
    ApiQuery({ name: 'slug', required: false }),
  );
};
