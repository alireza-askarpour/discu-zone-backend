import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { MembersRepository } from './members.repository';
import { InvitesRepository } from '../invites/invites.repository';
import { ServersRepository } from '../servers/servers.repository';

import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class MembersService {
  constructor(
    private membersRepository: MembersRepository,
    private invitesRepository: InvitesRepository,
    private serversRepository: ServersRepository,
  ) {}

  async getServerMembersList(serverId: string): Promise<ResponseFormat<any>> {
    const members = await this.membersRepository.findServerMembers(serverId);

    return {
      statusCode: HttpStatus.OK,
      data: {
        members,
      },
    };
  }

  async joinMemberToServer(
    userId: string,
    inviteSlug: string,
  ): Promise<ResponseFormat<any>> {
    if (!inviteSlug) {
      throw new BadRequestException(ResponseMessages.INVITE_SLUG_IS_REQUIRED);
    }

    // check exist invite
    const invite = await this.invitesRepository.findOneBySlug(inviteSlug);
    if (!invite) {
      throw new NotFoundException(ResponseMessages.INVALID_INVITE_SLUG);
    }

    // check exist server
    const server = await this.serversRepository.findById(invite.serverId);
    if (!server) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SERVER);
    }

    // join member to server
    const member = await this.membersRepository.create({
      userId,
      serverId: server.id,
      inviteId: invite.id,
    });

    // caes uses invite

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        member,
      },
    };
  }
}
