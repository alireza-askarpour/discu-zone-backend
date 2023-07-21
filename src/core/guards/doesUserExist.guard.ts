import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UsersService } from 'src/modules/users/users.service';
import { ResponseMessages } from '../constants/response-messages.constant';
import { emailPattern } from '../constants/pattern.constant';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: Request) {
    const email = request.body.email;
    if (!email || !emailPattern.test(email)) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL);
    }

    const userExist = await this.userService.findOneByEmail(request.body.email);
    if (userExist) {
      throw new ForbiddenException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }
    return true;
  }
}
