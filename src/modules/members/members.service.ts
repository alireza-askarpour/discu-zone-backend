import { HttpStatus, Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { ResponseFormat } from 'src/common/interfaces/response.interface';

@Injectable()
export class MembersService {
  constructor(private membersRepository: MembersRepository) {}

  async getServerMembersList(serverId: string): Promise<ResponseFormat<any>> {
    const members = await this.membersRepository.findServerMembers(serverId);

    return {
      statusCode: HttpStatus.OK,
      data: {
        members,
      },
    };
  }
}
