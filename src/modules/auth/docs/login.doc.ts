import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiLogin = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'login with email and password',
      description: 'get Jwt Token',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            refreshToken: 'xxxx',
            accessToken: 'xxxx',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          message: ResponseMessages.INVALID_USERNAME_OR_PASSWORD,
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
