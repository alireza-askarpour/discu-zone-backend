import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiUpdatePassword = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update password',
      description:
        'Update user password and save `accessToken` and `refreshToken` in cookie',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.PASSWORD_SUPDATED_SUCCESS,
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            ResponseMessages.BAD_REQUEST,
            ResponseMessages.PASSWORDS_DO_NOT_MATCH,
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: [
            ResponseMessages.EMAIL_ALREADY_EXIST,
            ResponseMessages.USERNAME_ALREADY_EXIST,
          ],
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [
            ResponseMessages.FAILED_SIGNUP,
            ResponseMessages.FAILED_SEND_CONFIRMATION_EMAIL,
          ],
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
