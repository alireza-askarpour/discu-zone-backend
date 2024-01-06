import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.user;
  },
);
