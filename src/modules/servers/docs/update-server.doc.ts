import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiUpdateServer = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update a server by id',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.SERVER_UPDATED_SUCCESS,
          data: {
            server: {
              id: 'd00ec552-556e-4cbb-9b74-1bb102f968ab',
              channels: [],
              categories: [],
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
