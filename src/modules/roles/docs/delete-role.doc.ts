import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiDeleteRole = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete role',
      description: "required permissions: 'ADMINISTRATOR' or 'MANAGE_MEMBERS'",
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: ResponseMessages.DELETED_ROLE,
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
          message: ResponseMessages.INVALID_ID,
          error: 'Bad Request',
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: 404,
          message: ResponseMessages.NOT_FOUND_ROLE,
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCide: 500,
          message: ResponseMessages.FAILED_DELETE_ROLE,
        },
      },
    }),
  );
};
