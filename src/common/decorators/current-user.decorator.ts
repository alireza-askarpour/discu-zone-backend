import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (keyname: keyof User, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const user = req.user;
    return keyname ? user[keyname] : user;
  },
);
