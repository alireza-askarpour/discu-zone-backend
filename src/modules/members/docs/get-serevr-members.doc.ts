import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

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
            members: [
              {
                id: 'ae1c3b59-f7f7-43ef-9fef-e1830450cc8b',
                serverId: 'e2113260-4019-46e2-a4b9-0b2c4550fe7d',
                userId: 'd17a087b-82fe-4f6e-b2d8-6ebe0dd1f0c1',
                inviteId: null,
                permissions: [],
                messages: [],
                createdAt: '2023-10-11T12:41:19.627Z',
                updatedAt: '2023-10-11T12:41:19.627Z',
              },
            ],
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 404,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
  );
};
