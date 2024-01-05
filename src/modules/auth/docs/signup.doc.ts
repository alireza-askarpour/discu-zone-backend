import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
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
            refreshToken: 'xxxx',
            accessToken: 'xxxx',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.USERNAME_ALREADY_EXIST,
          error: 'Bad Request',
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: ResponseMessages.EMAIL_ALREADY_EXIST,
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_SIGNUP,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
