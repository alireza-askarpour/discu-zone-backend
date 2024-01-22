import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import { User } from './entities/user.entity';
import { FileService } from '../file/file.service';
import { UsersRepository } from './users.repository';
import { isNull, isUndefined } from 'src/common/utils/validation.util';
import { excludeObjectKeys } from 'src/common/utils/exclude-object-keys.util';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class UsersService {
  constructor(
    private readonly fileService: FileService,
    private readonly usersRepository: UsersRepository,
  ) {}

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

  public async changeAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<ResponseFormat<any>> {
    try {
      if (!file) {
        throw new BadRequestException(ResponseMessages.AVATAR_IS_REQUIRE);
      }

      const user = await this.usersRepository.findOneById(userId);
      if (!user) {
        throw new NotFoundException(ResponseMessages.NOT_FOUND_USER);
      }

      const prevAvatar = user.avatar;
      const path = file?.path?.replace(/\\/g, '/');

      const [updateCount] = await this.usersRepository.updateById(userId, {
        avatar: path,
      });

      if (updateCount !== 1) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CHANGED_AVATAR,
        );
      }

      // check exist and deleve prev avatar from file system
      if (prevAvatar) {
        this.fileService.removeByPath(prevAvatar);
      }

      return {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.CHANGED_AVATAR_SUCCESS,
      };
    } catch (err) {
      const path = file?.path?.replace(/\\/g, '/');
      this.fileService.removeByPath(path);
      throw err;
    }
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
