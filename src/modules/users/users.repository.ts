import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UsersRepository {
  constructor(@Inject(USER_REPOSITORY) private userModel: typeof User) {}

  create(user: SignUpDto): Promise<User> {
    return this.userModel.create<User>(user);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { email } });
  }

  findOneById(id: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { id } });
  }
}
