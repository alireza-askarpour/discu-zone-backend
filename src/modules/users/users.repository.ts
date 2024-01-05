import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { USER_REPOSITORY } from 'src/common/constants';
import { OAuthProvidersEnum } from './enums/oauth-providers.enum';
import { SignUpDto } from './dto/signup.dto';
import { ICreateOAuthUserInput } from './interfaces/create-oauth-user-input.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersRepository {
  constructor(@Inject(USER_REPOSITORY) private userModel: typeof User) {}

  create(user: ICreateOAuthUserInput): Promise<User> {
    const isConfirmed = user.provider !== OAuthProvidersEnum.LOCAL;
    return this.userModel.create<User>({
      ...user,
      confirmed: isConfirmed,
      credentials: {
        lastPassword: '',
        passwordUpdatedAt: dayjs().unix(),
        updatedAt: dayjs().unix(),
        version: isConfirmed ? 1 : 0,
      },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { email } });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { username } });
  }

  findOneById(id: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { id } });
  }

  updateById(id: string, data: Partial<User>) {
    return this.userModel.update(data, { where: { id } });
  }
}
