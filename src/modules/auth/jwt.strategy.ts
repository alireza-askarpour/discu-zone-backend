import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersRepository } from '../users/users.repository';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.usersRepository.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    return payload;
  }
}
