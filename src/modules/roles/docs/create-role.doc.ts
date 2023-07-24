import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateRole = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create role',
      description: "required permissions: 'ADMINISTRATOR' or 'MANAGE_MEMBERS'",
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            role: {
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
