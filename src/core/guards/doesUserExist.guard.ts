import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UsersRepository } from 'src/modules/users/users.repository';
import { emailPattern } from '../constants/pattern.constant';
import { ResponseMessages } from '../constants/response-messages.constant';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

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

    const userExist = await this.usersRepository.findOneByEmail(
      request.body.email,
    );
    if (userExist) {
      throw new ForbiddenException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }
    return true;
  }
}
