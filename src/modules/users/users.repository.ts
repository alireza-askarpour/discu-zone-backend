import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  async findByUsername(username: string): Promise<User | null> {
    return User.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async createUser(userData: any): Promise<User> {
    console.log({userData})
    return User.create(userData);
  }
}
