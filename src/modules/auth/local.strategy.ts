import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { emailPattern } from 'src/core/constants/pattern.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(
        ResponseMessages.INVALID_USERNAME_OR_PASSWORD,
      );
    }
    return user;
  }
}
