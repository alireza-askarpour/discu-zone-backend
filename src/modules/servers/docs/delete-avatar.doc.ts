import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiDeleteAvatar = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete server avatar',
      description: 'delete server avatar',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: ResponseMessages.AVATAR_DELETED_SUCCESS,
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
    ApiForbiddenResponse({
      schema: {
        example: {
          statusCode: 403,
          message: ResponseMessages.ACCESS_DENIED,
          error: 'Forbidden',
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: 404,
          message: ResponseMessages.NOT_FOUND_SERVER,
          erorr: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: 500,
          message: ResponseMessages.FAILED_DELETE_AVATAR,
          erorr: 'Internal Server Error',
        },
      },
    }),
  );
};
