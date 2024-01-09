import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiLogin = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'login with email and password',
      description:
        'Login user and save `accessToken` and `refreshToken` in cookie',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.LOGINED_SUCCESS,
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: [
            ResponseMessages.UNAUTHORIZED,
            ResponseMessages.INVALID_CREDENTIALS,
            ResponseMessages[
              'PLEASE_CONFIRM_YOUR_EMAIL.A_NEW_EMAIL_HAS_BEEN_SENT'
            ],
          ],
          error: 'Unauthorized',
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.INVALID_EMAIL_OR_PASSWORD,
          error: 'Bad Request',
        },
      },
    }),
  );
};
