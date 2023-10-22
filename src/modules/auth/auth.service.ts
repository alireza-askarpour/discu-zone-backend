import {
  HttpStatus,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SignUpDto } from './dtos/signup.dto';
import { JwtService } from '../jwt/jwt.service';
import { UsersRepository } from '../users/users.repository';
import { configService } from 'src/common/config/app.config';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async login() {}

  async signin(user: SignUpDto): Promise<ResponseFormat<any>> {
    // prevent duplicate email
    const duplicatedEmail = await this.usersRepository.findOneByEmail(
      user.email,
    );
    if (duplicatedEmail) {
      throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }

    // save user in database
    const createdUser = await this.usersRepository.create(user);
    if (!createdUser) {
      throw new InternalServerErrorException(ResponseMessages.FAILED_SIGNUP);
    }

    // generate access tokan an refresh token
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signToken(
        createdUser.id,
        configService.get('ACCESS_TOKEN_SECRET_KEY'),
        configService.get('ACCESS_TOKEN_EXPIRES'),
      ),
      this.jwtService.signToken(
        createdUser.id,
        configService.get('REFRESH_TOKEN_SECRET_KEY'),
        configService.get('REFRESH_TOKEN_EXPIRES'),
      ),
    ]);

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        refreshToken,
        accessToken,
      },
    };
  }
}
