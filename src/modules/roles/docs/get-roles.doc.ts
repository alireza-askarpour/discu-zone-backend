import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiGetRoles = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get roles',
      description: "required permissions: 'ADMINISTRATOR' or 'MANAGE_MEMBERS'",
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            roles: [
              {
                id: 'c85e6630-9e27-4d0a-aaed-018ef2ee3b2f',
                name: 'Admin',
                color: '#fff314',
                permissions: [
                  '541b06bc-2511-4964-b7ac-917fe4884111',
                  '9e610e93-869c-4750-8be0-be2e33343bf1',
                ],
                server: '9e610e93-869c-4750-8be0-be2e33343bf1',
                channel: '900e378b-f681-403c-9eb1-455c52e55bd6',
                updatedAt: '2023-07-24T15:40:40.791Z',
                createdAt: '2023-07-24T15:40:40.791Z',
              },
              {
                id: '486eb5e2-c4f9-4b9a-a3ea-7f3834112c17',
                name: 'Frends',
                color: '#e1e1e1',
                permissions: ['c85e6630-9e27-4d0a-aaed-018ef2ee3b2f'],
                server: '9e610e93-869c-4750-8be0-be2e33343bf1',
                channel: '900e378b-f681-403c-9eb1-455c52e55bd6',
                createdAt: '2023-07-24T15:48:40.442Z',
                updatedAt: '2023-07-24T15:48:40.442Z',
              },
            ],
          },
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
