import { JwtService as _JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersRepository } from '../users/users.repository';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: _JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  // generate token
  async signToken(userId: string, secretKey: string, expiresIn: string) {
    return new Promise(async (resolve) => {
      const user = await this.usersRepository.findOneById(userId);
      if (!user) {
        throw new NotFoundException(ResponseMessages.NOT_FOUND_USER);
      }

      const payload = { userId: user.id };
      const options = { expiresIn, secret: secretKey };

      const token = this.jwtService.signAsync(payload, options);

      resolve(token);
    });
  }

  // verify refresh token
  // async vefiryRefreshToken(token: string) {
  //   return new Promise(async (resolve, reject) => {
  //     const payload: any = this.jwtService.verifyAsync(token, {
  //       secret: configService.get('REFRESH_TOKEN_SECRET_KEY'),
  //     });

  //     const user = await this.usersRepository.findOneById(payload.userId);
  //     if (!user) {
  //       return reject(new UnauthorizedException(ResponseMessages.UNAUTHORIZED));
  //     }

  //     resolve(payload?.userId);
  //   });
  // }

  // verifyAccessToken(token: string) {
  //   return this.jwtService.verify(
  //     token,
  //     configService.get('ACCESS_TOKEN_SECRET_KEY'),
  //   );
  // }
}
