import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ResponseFormat } from 'src/common/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getMe(id: string): Promise<ResponseFormat<any>> {
    const user = await this.usersRepository.findOneById(id);
    delete user.password;
    return { statusCode: HttpStatus.OK, data: { user } };
  }
}
