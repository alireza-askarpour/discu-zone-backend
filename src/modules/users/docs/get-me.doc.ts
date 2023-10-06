import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiGetMe = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get loggedin user',
      description: 'get loggedin user',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          user: {
            id: '9e610e93-869c-4750-8be0-be2e33343bf1',
            fullName: 'John Doe',
            username: null,
            email: 'johndoe@gmail.com',
            avatar: null,
            cover: null,
            friends: [],
            servers: [],
            createdAt: '2023-07-21T18:28:58.186Z',
            updatedAt: '2023-07-21T18:28:58.186Z',
          },
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
  );
};
