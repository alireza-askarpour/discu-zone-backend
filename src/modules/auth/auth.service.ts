import {
  Inject,
  Injectable,
  HttpStatus,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { CommonService } from 'src/common/common.service';
import { UsersRepository } from '../users/users.repository';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { EmailDto } from './interfaces/email.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

import { TokenTypeEnum } from '../jwt/enums/token-type.enum';
import { OAuthProvidersEnum } from '../users/enums/oauth-providers.enum';

import { IAuthResult } from './interfaces/auth-result.interface';
import { IEmailToken } from '../jwt/interfaces/email-token.interface';
import { ICredentials } from '../users/interfaces/credentials.interface';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { IRefreshToken } from '../jwt/interfaces/refresh-token.interface';

import { isNull, isUndefined } from 'src/common/utils/validation.util';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private jwtService: JwtService,
    private mailService: MailService,
    private usersService: UsersService,
    private configService: ConfigService,
    private commonService: CommonService,
    private usersRepository: UsersRepository,
  ) {}

  public async signup(
    signupDto: SignUpDto,
    domain?: string,
  ): Promise<ResponseFormat<any>> {
    // prevent duplicate email and username
    const [duplicatedEmail, duplicatedUsername] = await Promise.all([
      this.usersRepository.findByEmail(signupDto.email),
      this.usersRepository.findOneByUsername(signupDto.username),
    ]);

    if (duplicatedEmail) {
      throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }
    if (duplicatedUsername) {
      throw new ConflictException(ResponseMessages.USERNAME_ALREADY_EXIST);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(signupDto.password, salt);

    // save user in database
    const createdUser = await this.usersRepository.create({
      ...signupDto,
      password: hashedPassword,
      provider: OAuthProvidersEnum.LOCAL,
    });
    if (!createdUser) {
      throw new InternalServerErrorException(ResponseMessages.FAILED_SIGNUP);
    }

    const confirmationToken = await this.jwtService.generateToken(
      createdUser,
      TokenTypeEnum.CONFIRMATION,
      domain,
    );
console.log({confirmationToken, email: createdUser.email});
    await this.mailService.sendConfirmationEmail(
      createdUser.email,
      confirmationToken,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.REGISTERED_SUCCESS,
    };
  }

  public async login(
    loginDto: LoginDto,
    domain?: string,
  ): Promise<IAuthResult> {
    // check exist user by email
    const user = await this.usersRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      await this.checkLastPassword(user.credentials, loginDto.password);
    }

    if (!user.confirmed) {
      const confirmationToken = await this.jwtService.generateToken(
        user,
        TokenTypeEnum.CONFIRMATION,
        domain,
      );
      await this.mailService.sendConfirmationEmail(
        user.email,
        confirmationToken,
      );
      throw new UnauthorizedException(
        ResponseMessages['PLEASE_CONFIRM_YOUR_EMAIL.A_NEW_EMAIL_HAS_BEEN_SENT'],
      );
    }

    // generate access tokan an refresh token
    const [accessToken, refreshToken] =
      await this.jwtService.generateAuthTokens(user, domain);

    return {
      token: { accessToken, refreshToken },
      response: {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.LOGINED_SUCCESS,
      },
    };
  }

  public async confirmEmail(
    dto: ConfirmEmailDto,
    domain?: string,
  ): Promise<IAuthResult> {
    const { id, version } = await this.jwtService.verifyToken<IEmailToken>(
      dto.confirmationToken,
      TokenTypeEnum.CONFIRMATION,
    );
    const user = await this.usersService.confirmEmail(id, version);
    const [accessToken, refreshToken] =
      await this.jwtService.generateAuthTokens(user, domain);

    return {
      token: { accessToken, refreshToken },
      response: {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.EMAIL_CONFIRMED_SUCCESS,
      },
    };
  }

  public async resetPasswordEmail(
    dto: EmailDto,
    domain?: string,
  ): Promise<ResponseFormat<any>> {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!isUndefined(user) && !isNull(user)) {
      const resetToken = await this.jwtService.generateToken(
        user,
        TokenTypeEnum.RESET_PASSWORD,
        domain,
      );
      await this.mailService.sendResetPasswordEmail(user.email, resetToken);
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.RESET_PASSWORD_EMAIL_SENT,
    };
  }

  public async resetPassword(
    dto: ResetPasswordDto,
  ): Promise<ResponseFormat<any>> {
    const { password, resetToken } = dto;
    const { id, version } = await this.jwtService.verifyToken<IEmailToken>(
      resetToken,
      TokenTypeEnum.RESET_PASSWORD,
    );
    await this.usersService.resetPassword(id, version, password);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PASSWORD_RESET_SUCCESSFULLY,
    };
  }

  public async refreshTokenAccess(
    refreshToken: string,
    domain?: string,
  ): Promise<IAuthResult> {
    const { id, version, tokenId } =
      await this.jwtService.verifyToken<IRefreshToken>(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );
    await this.checkIfTokenIsBlacklisted(id, tokenId);
    const user = await this.usersService.findOneByCredentials(id, version);
    const [accessToken, newRefreshToken] =
      await this.jwtService.generateAuthTokens(user, domain, tokenId);

    return {
      token: { accessToken, refreshToken: newRefreshToken },
      response: {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.REFRESHED_TOKEN_SUCCESS,
      },
    };
  }

  public async updatePassword(
    userId: string,
    dto: ChangePasswordDto,
    domain?: string,
  ): Promise<IAuthResult> {
    const { newPassword, currentPassword, confirmNewPassword } = dto;
    this.comparePasswords(newPassword, confirmNewPassword);
    const user = await this.usersService.updatePassword(
      userId,
      newPassword,
      currentPassword,
    );
    const [accessToken, refreshToken] =
      await this.jwtService.generateAuthTokens(user, domain);

    return {
      token: { accessToken, refreshToken },
      response: {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.PASSWORD_SUPDATED_SUCCESS,
      },
    };
  }

  public async logout(refreshToken: string): Promise<ResponseFormat<any>> {
    const { id, tokenId, exp } =
      await this.jwtService.verifyToken<IRefreshToken>(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );
    await this.blacklistToken(id, tokenId, exp);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.LOGOUT_SUCCESSFUL,
    };
  }

  private async checkLastPassword(
    credentials: ICredentials,
    password: string,
  ): Promise<void> {
    const { lastPassword, passwordUpdatedAt } = credentials;

    if (
      lastPassword.length === 0 ||
      !(await bcrypt.compare(password, lastPassword))
    ) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    const now = dayjs();
    const time = dayjs.unix(passwordUpdatedAt);
    const months = now.diff(time, 'month');
    const message = 'You changed your password ';

    if (months > 0) {
      throw new UnauthorizedException(
        message + months + (months > 1 ? ' months ago' : ' month ago'),
      );
    }

    const days = now.diff(time, 'day');

    if (days > 0) {
      throw new UnauthorizedException(
        message + days + (days > 1 ? ' days ago' : ' day ago'),
      );
    }

    const hours = now.diff(time, 'hour');

    if (hours > 0) {
      throw new UnauthorizedException(
        message + hours + (hours > 1 ? ' hours ago' : ' hour ago'),
      );
    }

    throw new UnauthorizedException(message + 'recently');
  }

  private async checkIfTokenIsBlacklisted(
    userId: string,
    tokenId: string,
  ): Promise<void> {
    const time = await this.cacheManager.get<number>(
      `blacklist:${userId}:${tokenId}`,
    );
    if (!isUndefined(time) && !isNull(time)) {
      throw new UnauthorizedException(ResponseMessages.INVALID_TOKEN);
    }
  }

  private async blacklistToken(
    userId: string,
    tokenId: string,
    exp: number,
  ): Promise<void> {
    const now = dayjs().unix();
    const ttl = (exp - now) * 1000;

    if (ttl > 0) {
      await this.commonService.throwInternalError(
        this.cacheManager.set(`blacklist:${userId}:${tokenId}`, now, ttl),
      );
    }
  }

  private comparePasswords(
    newPassword: string,
    confirmNewPassword: string,
  ): void {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException(ResponseMessages.PASSWORDS_DO_NOT_MATCH);
    }
  }
}
