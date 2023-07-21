import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';
import { USER_REPOSITORY } from 'src/core/constants';
import { ResponseFormat } from 'src/core/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async create(user: SignUpDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async getMe(id: string): Promise<ResponseFormat<any>> {
    const user = await this.userRepository.findOne({ where: { id } });
    return { statusCode: HttpStatus.OK, data: { user } };
  }
}
