import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { InvitesRepository } from './invites.repository';
import { ServersRepository } from '../servers/servers.repository';

import { InviteCreateDto } from './dtos/create-invite.dto';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class InvitesService {
  constructor(
    private invitesRepository: InvitesRepository,
    private serversRepository: ServersRepository,
  ) {}

  async create(
    userId: string,
    serverId: string,
    data: InviteCreateDto,
  ): Promise<ResponseFormat<any>> {
    const [existServer] = await Promise.all([
      this.serversRepository.findById(serverId),
      // check exist member by userId and serverId in members model
    ]);
    if (!existServer) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SERVER);
    }

    const createdInvite = await this.invitesRepository.create({
      ...data,
      serverId,
      inviterId: userId,
    });

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        slug: createdInvite.slug,
      },
    };
  }
}
