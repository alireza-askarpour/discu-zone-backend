import {
  HttpStatus,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { isNull, isUndefined } from 'src/common/utils/validation.util';
import { excludeObjectKeys } from 'src/common/utils/exclude-object-keys.util';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getMe(id: string): Promise<ResponseFormat<any>> {
    const user = await this.usersRepository.findOneById(id);
    const result = excludeObjectKeys(user, 'password', 'credentials');
    return { statusCode: HttpStatus.OK, data: { user: result } };
  }

  public async confirmEmail(userId: string, version: number): Promise<User> {
    const user = await this.findOneByCredentials(userId, version);

    if (user.confirmed) {
      throw new BadRequestException(ResponseMessages.EMAIL_ALREADY_CONFIRMED);
    }

    user.updateCredentialsVersion();
    await this.usersRepository.updateById(userId, {
      confirmed: true,
    });

    return user;
  }

  public async findOneByCredentials(
    id: string,
    version: number,
  ): Promise<User> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    if (user.credentials.version !== version) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    return user;
  }

  public async resetPassword(
    userId: string,
    version: number,
    password: string,
  ): Promise<User> {
    const user = await this.findOneByCredentials(userId, version);
    return await this.changePassword(user, password);
  }

  public async updatePassword(
    userId: string,
    newPassword: string,
    currentPassword?: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOneById(userId);

    if (user.password !== 'UNSET') {
      if (isUndefined(currentPassword) || isNull(currentPassword)) {
        throw new BadRequestException('Password is required');
      }
      if (!(await compare(currentPassword, user.password))) {
        throw new BadRequestException(ResponseMessages.WRONG_PASSWORD);
      }
      if (await compare(newPassword, user.password)) {
        throw new BadRequestException(
          ResponseMessages.NEW_PASSWORD_MUST_BE_DIFFERENT,
        );
      }
    }

    return await this.changePassword(user, newPassword);
  }

  private async changePassword(user: User, password: string): Promise<User> {
    user.updateCredentialsPassword(user.password);
    const newPassword = await hash(password, 10);

    await this.usersRepository.updateById(user.id, {
      password: newPassword,
    });

    return user;
  }
}
