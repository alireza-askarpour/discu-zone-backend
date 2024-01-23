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
      },
    });
  }

  create(senderId: string, receiverId: string): Promise<Friend> {
    return this.friendModel.create({
      requestSenderId: senderId,
      requestReceiverId: receiverId,
      status: StatusEnum.PENDING,
      inviteNotifStatus: InviteStatusEnum.SENT,
    });
  }

  deleteBySenderIdAndReceiverId(
    senderId: string,
    receiverId: string,
  ): Promise<number> {
    return this.friendModel.destroy({
      where: { requestSenderId: senderId, requestReceiverId: receiverId },
    });
  }

  updateStatus(senderId: string, receiverId: string) {
    return this.friendModel.update(
      {
        status: StatusEnum.ACCEPTED,
      },
      {
        where: {
          requestSenderId: senderId,
          requestReceiverId: receiverId,
        },
      },
    );
  }

  findAlreadyAcceptedInvite(senderId: string, receiverId: string) {
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

  findOne(
    senderId: string,
    receiverId: string,
    status?: StatusEnum,
  ): Promise<Friend> {
    const query: any = {
      requestSenderId: senderId,
      requestReceiverId: receiverId,
    };
    if (status) query.status = status;
    return this.friendModel.findOne({ where: query });
  }

  deleteByReceiver(senderId: string, receiverId: string): Promise<number> {
    return this.friendModel.destroy({
      where: {
        requestSenderId: senderId,
        requestReceiverId: receiverId,
        status: StatusEnum.PENDING,
      },
    });
  }
}
