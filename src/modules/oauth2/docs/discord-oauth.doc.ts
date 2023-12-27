import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';

export const ApiDiscordOauth = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Redirects to Discord OAuth2 login page',
      status: HttpStatus.TEMPORARY_REDIRECT,
    }),
    ApiNotFoundResponse({
      description: 'OAuth2 is not enabled for Discord',
    }),
  );
};

export const ApiDiscordCallbackOauth = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Redirects to the frontend with the JWT token',
      status: HttpStatus.PERMANENT_REDIRECT,
    }),
    ApiNotFoundResponse({
      description: 'OAuth2 is not enabled for Discord',
    }),
  );
};
