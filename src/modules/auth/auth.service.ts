import {
  HttpStatus,
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';

import { JwtService } from '../jwt/jwt.service';
import { UsersRepository } from '../users/users.repository';

import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersRepository: UsersRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseFormat<any>> {
    // check exist user by email
    const user = await this.usersRepository.findOneByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const isMatch = bcrypt.compareSync(loginDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    // generate access tokan an refresh token
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.jwtService.signToken(
    //     user.id,
    //     configService.get('ACCESS_TOKEN_SECRET_KEY'),
    //     configService.get('ACCESS_TOKEN_EXPIRES'),
    //   ),
    //   this.jwtService.signToken(
    //     user.id,
    //     configService.get('REFRESH_TOKEN_SECRET_KEY'),
    //     configService.get('REFRESH_TOKEN_EXPIRES'),
    //   ),
    // ]);

    return {
      statusCode: HttpStatus.OK,
      data: {
        // refreshToken,
        // accessToken,
      },
    };
  }

  async signin(signupDto: SignUpDto): Promise<ResponseFormat<any>> {
    // prevent duplicate email
    const duplicatedEmail = await this.usersRepository.findOneByEmail(
      signupDto.email,
    );
    if (duplicatedEmail) {
      throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(signupDto.password, salt);
    signupDto.password = hashedPassword;

    // save user in database
    const createdUser = await this.usersRepository.create(signupDto);
    if (!createdUser) {
      throw new InternalServerErrorException(ResponseMessages.FAILED_SIGNUP);
    }

    // generate access tokan an refresh token
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.jwtService.signToken(
    //     createdUser.id,
    //     configService.get('ACCESS_TOKEN_SECRET_KEY'),
    //     configService.get('ACCESS_TOKEN_EXPIRES'),
    //   ),
    //   this.jwtService.signToken(
    //     createdUser.id,
    //     configService.get('REFRESH_TOKEN_SECRET_KEY'),
    //     configService.get('REFRESH_TOKEN_EXPIRES'),
    //   ),
    // ]);

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        // refreshToken,
        // accessToken,
      },
    };
  }
}
