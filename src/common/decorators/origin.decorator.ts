import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Origin = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    const request: Request = context.switchToHttp().getRequest();
    return request.headers?.origin;
  },
);
