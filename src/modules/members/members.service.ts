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

    // check is valid invite
    const invite = await this.invitesRepository.findOneBySlug(inviteSlug);
    if (!invite) {
      throw new NotFoundException(ResponseMessages.INVALID_INVITE_SLUG);
    }

    // check exist server and check already exist umember
    const [server, existMember] = await Promise.all([
      this.serversRepository.findById(invite.serverId),
      this.membersRepository.findMemberByUserId(userId),
    ]);
    if (!server) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SERVER);
    }
    if (existMember) {
      throw new BadRequestException(ResponseMessages.MEMBER_ALREADY_EXISTS);
    }

    // check exipred invite time
    const now = Date.now();
    if (invite.expiresAt && invite.expiresAt < now) {
      throw new BadRequestException(ResponseMessages.EXPIRED_INVITE_TIME);
    }

    // check used invite maximum
    if (invite.maxUse && invite.maxUse <= invite.uses) {
      throw new BadRequestException(ResponseMessages.USED_INVITE_MAXIMUM);
    }

    // join member to server and increment invite uses
    const promises: Promise<any>[] = [
      this.membersRepository.create({
        userId,
        serverId: server.id,
        inviteId: invite.id,
      }),
    ];
    if (invite.uses) {
      const updateUses = this.invitesRepository.updateUsesById(invite.id);
      promises.push(updateUses);
    }
    const [createdMember] = await Promise.all(promises);

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        member: createdMember,
      },
    };
  }
}
