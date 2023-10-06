import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { USER_REPOSITORY } from 'src/common/constants';
import { ResponseFormat } from 'src/common/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getMe(id: string): Promise<ResponseFormat<any>> {
    const user = await this.usersRepository.findOneById(id);
    delete user.password;
    return { statusCode: HttpStatus.OK, data: { user } };
  }
}
