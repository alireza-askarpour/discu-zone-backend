import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { isJWT } from 'class-validator';
import { Reflector } from '@nestjs/core';

import { JwtService } from '../../modules/jwt/jwt.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { TokenTypeEnum } from '../../modules/jwt/enums/token-type.enum';
import { isNull, isUndefined } from '../../common/utils/validation.util';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const activate = await this.setHttpHeader(
      context.switchToHttp().getRequest<Request>(),
      isPublic,
      this.usersRepository,
    );
    if (!activate) {
      throw new UnauthorizedException();
    }

    return activate;
  }

  private async setHttpHeader(
    req: Request,
    isPublic: boolean,
    usersRepository: UsersRepository,
  ): Promise<boolean> {
    const auth = req.headers?.authorization;

    if (isUndefined(auth) || isNull(auth) || auth.length === 0) {
      return isPublic;
    }

    const authArr = auth.split(' ');
    const bearer = authArr[0];
    const token = authArr[1];

    if (isUndefined(bearer) || isNull(bearer) || bearer !== 'Bearer') {
      return isPublic;
    }
    if (isUndefined(token) || isNull(token) || !isJWT(token)) {
      return isPublic;
    }

    try {
      const { id } = await this.jwtService.verifyToken(
        token,
        TokenTypeEnum.ACCESS,
      );

      const user = await usersRepository.findOneById(id);
      console.log(user);
      req.user = user;
      return true;
    } catch (_) {
      return isPublic;
    }
  }
}
