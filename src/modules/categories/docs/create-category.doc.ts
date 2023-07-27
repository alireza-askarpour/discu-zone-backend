import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateCategory = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create category',
      description: "required permissions: 'ADMINISTRATOR' or 'MANAGE_MEMBERS'",
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            category: {
              id: 'b1ee8c56-b344-46cd-a8c4-da95c3ba05a5',
              channels: [],
              roles: [],
              members: [],
              name: 'Text Channels',
              server: '2566970d-ed89-4210-954a-c804bd95dfdd',
              private: true,
              updatedAt: '2023-07-27T14:32:55.647Z',
              createdAt: '2023-07-27T14:32:55.647Z',
            },
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          messae: ResponseMessages.UNAUTHORIZED,
        },
      },
    }),
  );
};
