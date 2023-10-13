import { Inject, Injectable } from '@nestjs/common';
import { Invite } from './invite.entity';
import { INVITE_REPOSITORY } from 'src/common/constants';
import { InviteCreateDto } from './dtos/create-invite.dto';
import {
  nanoid,
  alphabetNumber,
  alphabetLetters,
} from 'src/common/utils/nanoid.util';

@Injectable()
export class InvitesRepository {
  constructor(
    @Inject(INVITE_REPOSITORY)
    private readonly inviteModel: typeof Invite,
  ) {}

  create(data: InviteCreateDto) {
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
