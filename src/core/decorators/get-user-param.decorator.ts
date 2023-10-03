import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';

export const getUser = createParamDecorator(
  (keyname: keyof User, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const user = req.user;
    return keyname ? user[keyname] : user;
  },
);
