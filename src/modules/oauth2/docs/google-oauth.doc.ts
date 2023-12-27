import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';

export const ApiGoogleOAuth = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Redirects to Google OAuth2 login page',
      status: HttpStatus.TEMPORARY_REDIRECT,
    }),
    ApiNotFoundResponse({
      description: 'OAuth2 is not enabled for Google',
    }),
  );
};

export const ApiGoogleCallbackOAuth = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Redirects to the frontend with the JWT token',
      status: HttpStatus.PERMANENT_REDIRECT,
    }),
    ApiNotFoundResponse({
      description: 'OAuth2 is not enabled for Google',
    }),
  );
};
