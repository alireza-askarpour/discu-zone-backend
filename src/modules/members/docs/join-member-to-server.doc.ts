import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiJoinMemberToServer = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'joi member to server',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            member: {
              id: 'ae1c3b59-f7f7-43ef-9fef-e1830450cc8b',
              serverId: 'e2113260-4019-46e2-a4b9-0b2c4550fe7d',
              userId: 'd17a087b-82fe-4f6e-b2d8-6ebe0dd1f0c1',
              inviteId: null,
              permissions: [],
              messages: [],
              createdAt: '2023-10-11T12:41:19.627Z',
              updatedAt: '2023-10-11T12:41:19.627Z',
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            ResponseMessages.INVITE_SLUG_IS_REQUIRED,
            ResponseMessages.MEMBER_ALREADY_EXISTS,
            ResponseMessages.EXPIRED_INVITE_TIME,
            ResponseMessages.USED_INVITE_MAXIMUM,
          ],
          error: 'Bad Request',
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
          statusCode: HttpStatus.NOT_FOUND,
          message: [
            ResponseMessages.INVALID_INVITE_SLUG,
            ResponseMessages.NOT_FOUND_SERVER,
          ],
          error: 'Not Found',
        },
      },
    }),
  );
};
