import { Inject, Injectable } from '@nestjs/common';
import { Member } from './member.entity';
import { User } from '../users/user.entity';
import { MEMBER_REPOSITORY } from 'src/common/constants';
import { MemberCreateInput } from 'src/common/interfaces/member.interface';

@Injectable()
export class MembersRepository {
  constructor(@Inject(MEMBER_REPOSITORY) private memberModel: typeof Member) {}

  create(data: MemberCreateInput): Promise<Member> {
    return this.memberModel.create(data);
  }

  findServerMembers(serverId: string): Promise<Member[]> {
    return this.memberModel.findAll({
      where: { serverId },
      attributes: { exclude: ['serverId', 'userId', 'inviteId'] },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'id',
              'password',
              'createAt',
              'updatedAt',
              'servers',
              'friends',
              'email',
            ],
          },
        },
      ],
    });
  }
}
