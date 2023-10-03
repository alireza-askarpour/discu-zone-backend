import { Inject, Injectable } from '@nestjs/common';
import { Invite } from './invite.entity';
import { INVITE_REPOSITORY } from 'src/core/constants';
import { InviteCreateDto } from './dtos/create-invite.dto';
import {
  nanoid,
  alphabetNumber,
  alphabetLetters,
} from 'src/core/utils/nanoid.util';

@Injectable()
export class InvitesRepository {
  constructor(
    @Inject(INVITE_REPOSITORY)
    private readonly invitesRepository: typeof Invite,
  ) {}

  create(data: InviteCreateDto) {
    return this.invitesRepository.create({
      ...data,
      slug: nanoid(alphabetNumber + alphabetLetters, 12),
    });
  }

  updateUsesById(id: string) {
    return this.invitesRepository.increment('uses', { by: 1, where: { id } });
  }
}
