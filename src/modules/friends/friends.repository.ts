import { Op } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { StatusEnum } from './enums/status.enum';
import { Friend } from './entities/friend.entity';
import { FRIEND_REPOSITORY } from 'src/common/constants';
import { InviteStatusEnum } from './enums/invite-status.enum';

@Injectable()
export class FriendsRepository {
  constructor(@Inject(FRIEND_REPOSITORY) private friendModel: typeof Friend) {}

  findInviteAlreadySentOrReceived(
    senderId: string,
    receiverId: string,
  ): Promise<Friend> {
    return this.friendModel.findOne({
      where: {
        [Op.or]: [
          { requestSenderId: senderId, requestReceiverId: receiverId },
          { requestSenderId: receiverId, requestReceiverId: senderId },
        ],
        status: StatusEnum.ACCEPTED,
      },
    });
  }

  create(senderId: string, receiverId: string) {
    return this.friendModel.create({
      requestSenderId: senderId,
      requestReceiverId: receiverId,
      status: StatusEnum.PENDING,
      inviteNotifStatus: InviteStatusEnum.SENT,
    });
  }
}
