import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetPermissions = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get permissions list',
      description: 'get all permissions',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 200,
          data: [
            {
              permissions: {
                id: '541b06bc-2511-4964-b7ac-917fe4884111',
                name: 'ADMINISTRATOR',
                description:
                  'Members with this permission will have every permission',
                updatedAt: '2023-07-23T19:51:46.061Z',
                createdAt: '2023-07-23T19:51:46.061Z',
              },
            },
            {
              permissions: {
                id: '900e378b-f681-403c-9eb1-455c52e55bd6',
                name: 'MANAGEMENT_MEMBER',
                description:
                  'Members with this permission will have manage members is server',
                updatedAt: '2023-07-23T19:51:46.061Z',
                createdAt: '2023-07-23T19:51:46.061Z',
              },
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
  );
};
