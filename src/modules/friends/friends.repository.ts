import { Op } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { StatusEnum } from './enums/status.enum';
import { Friend } from './entities/friend.entity';
import { FRIEND_REPOSITORY } from 'src/common/constants';

@Injectable()
export class FriendsRepository {
  constructor(@Inject(FRIEND_REPOSITORY) private friendModel: typeof Friend) {}

  findAll(userId: string): Promise<Friend[]> {
    return this.friendModel.findAll({
      where: {
        [Op.or]: [{ requesterId: userId }, { addresseeId: userId }],
        status: StatusEnum.ACCEPTED,
      },
    });
  }
}
