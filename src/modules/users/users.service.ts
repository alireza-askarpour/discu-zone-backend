import {
  HttpStatus,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getMe(id: string): Promise<ResponseFormat<any>> {
    const user = await this.usersRepository.findOneById(id);
    delete user.password;
    return { statusCode: HttpStatus.OK, data: { user } };
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
}
