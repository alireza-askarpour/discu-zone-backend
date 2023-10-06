import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

export const ApiCreateInvite = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create invite link',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            slug: 'bqDOCqBiykDj',
          },
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: 404,
          message: ResponseMessages.NOT_FOUND_SERVER,
          error: 'Not Found',
        },
      },
    }),
  );
};
