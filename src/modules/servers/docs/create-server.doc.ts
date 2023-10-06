import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateServer = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create server',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          message: ResponseMessages.SERVER_CREATED_SUCCESS,
          data: {
            server: {
              id: 'd00ec552-556e-4cbb-9b74-1bb102f968ab',
              channels: [],
              categories: [],
              members: [],
              roles: [],
              name: 'Jamshidland',
              owner: '9e610e93-869c-4750-8be0-be2e33343bf1',
              updatedAt: '2023-10-01T21:01:01.043Z',
              createdAt: '2023-10-01T21:01:01.043Z',
              avatar: null,
            },
          },
        },
      },
    }),
  );
};
