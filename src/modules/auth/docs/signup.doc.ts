import { HttpStatus, applyDecorators } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiSignup = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'signup with displayName, email and password',
      description: 'get Jwt Token',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            token: 'xxxx',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.USERNAME_ALREADY_EXISTED,
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
