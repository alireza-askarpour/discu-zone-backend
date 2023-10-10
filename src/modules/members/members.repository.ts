import { Inject, Injectable } from '@nestjs/common';
import { MEMBER_REPOSITORY } from 'src/common/constants';
import { Member } from './member.entity';

@Injectable()
export class MembersRepository {
  constructor(@Inject(MEMBER_REPOSITORY) private memberModel: typeof Member) {}
}
