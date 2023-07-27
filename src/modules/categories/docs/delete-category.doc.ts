import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiDeleteCategory = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete category by id',
      description: "required permissions: 'ADMINISTRATOR'",
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.DELETED_CATEGORY,
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: NOTFOUND,
          message: ResponseMessages.NOT_FOUND_CATEGORY,
          error: 'Not found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_DELETE_CATEGORY,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
