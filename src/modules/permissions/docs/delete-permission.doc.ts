import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiDeletePermission = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete permission',
      description: 'delete a permission by id',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 200,
          message: ResponseMessages.DELETED_PERMISSION,
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: 404,
          message: ResponseMessages.NOT_FOUND_PERMISSION,
          error: 'Not found',
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
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: 500,
          message: ResponseMessages.FAILED_DELETE_PERMISSION,
          error: 'Internal Server Error ',
        },
      },
    }),
  );
};
