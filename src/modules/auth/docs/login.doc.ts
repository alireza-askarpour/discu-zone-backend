import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
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
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          message: ResponseMessages.INVALID_EMAIL_OR_PASSWORD,
          error: 'Bad Request',
        },
      },
    }),
  );
};
