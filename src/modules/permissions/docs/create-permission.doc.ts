import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreatePermission = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create permission',
      description: 'create permission with name and description properties',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            permission: {
              id: '541b06bc-2511-4964-b7ac-917fe4884111',
              name: 'ADMINISTRATOR',
              description: 'Members with this permission will have every permission',
              updatedAt: '2023-07-23T19:51:46.061Z',
              createdAt: '2023-07-23T19:51:46.061Z',
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
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          message: ResponseMessages.NAME_ALREADY_EXIST,
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: 500,
          message: ResponseMessages.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error ',
        },
      },
    }),
  );
};
