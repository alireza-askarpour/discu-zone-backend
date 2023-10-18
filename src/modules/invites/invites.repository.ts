import { Inject, Injectable } from '@nestjs/common';
import { Invite } from './invite.entity';
import {
  nanoid,
  alphabetNumber,
  alphabetLetters,
} from 'src/common/utils/nanoid.util';
import { INVITE_REPOSITORY } from 'src/common/constants';
import { CreateInviteInput } from 'src/common/interfaces/invite.interface';

@Injectable()
export class InvitesRepository {
  constructor(
    @Inject(INVITE_REPOSITORY)
    private readonly inviteModel: typeof Invite,
  ) {}

  create(data: CreateInviteInput) {
    return this.inviteModel.create({
      ...data,
      slug: nanoid(alphabetNumber + alphabetLetters, 12),
    });
  }

  updateUsesById(id: string) {
    return this.inviteModel.increment('uses', { by: 1, where: { id } });
  }

  findOneBySlug(slug: string) {
    return this.inviteModel.findOne({ where: { slug } });
  }
}
