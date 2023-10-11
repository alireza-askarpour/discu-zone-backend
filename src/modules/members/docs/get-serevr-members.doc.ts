import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiGetServerMembers = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get members list from server',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            members: {},
          },
        },
      },
    }),
  );
};
