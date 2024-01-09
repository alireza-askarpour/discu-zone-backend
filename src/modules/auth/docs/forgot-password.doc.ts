import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiForgetPassword = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'forgot password',
      description:
        'Create a reset password token and send email reset password to user',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.RESET_PASSWORD_EMAIL_SENT,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_SEND_RESET_PASSWORD_EMAIL,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
