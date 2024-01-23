import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { FriendsRepository } from './friends.repository';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';
import { StatusEnum } from './enums/status.enum';

@Injectable()
export class FriendsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly friendsRepository: FriendsRepository,
  ) {}

  async sentInvite(
    senderId: string,
    receiverUsername: string,
  ): Promise<ResponseFormat<any>> {
    // check exist receiver
    const receiver = await this.usersRepository.findOneByUsername(
      receiverUsername,
    );
    if (!receiver || receiver.id === senderId) {
      throw new BadRequestException(ResponseMessages.NOT_FOUND_USER);
    }

    // Checking whether a request has already been sent to this user or this user has already sent a request
    const existRequest =
      await this.friendsRepository.findInviteAlreadySentOrReceived(
        senderId,
        receiver.id,
      );
    if (existRequest) {
      throw new BadRequestException(
        ResponseMessages.INVITE_ALREADY_SENT_OR_RECIVED_FOR_YOU,
      );
    }

    // create friend record
    await this.friendsRepository.create(senderId, receiver.id);

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.INVITED_SENT_SUCCESS,
    };
  }

  async cancelInvite(
    senderId: string,
    receiverId: string,
  ): Promise<ResponseFormat<any>> {
    // check exist receiver
    const receiver = await this.usersRepository.findOneById(receiverId);
    if (!receiver || receiver.id === senderId) {
      throw new BadRequestException(ResponseMessages.NOT_FOUND_USER);
    }

    await this.friendsRepository.deleteBySenderIdAndReceiverId(
      senderId,
      receiver.id,
    );

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.CANCELED_INVITE_SUCCESS,
    };
  }

  async acceptInvite(
    senderId: string,
    receiverId: string,
  ): Promise<ResponseFormat<any>> {
    // check exist sender and check already don't accepted invite
    const [sender, alreadyAcceptedInvite, existRecord] = await Promise.all([
      this.usersRepository.findOneById(senderId),
      this.friendsRepository.findAlreadyAcceptedInvite(senderId, receiverId),
      this.friendsRepository.findOne(senderId, receiverId),
    ]);
    console.log({senderId, receiverId});
    if (!sender || receiverId === senderId) {
      throw new BadRequestException(ResponseMessages.NOT_FOUND_SENDER);
    }
    if (alreadyAcceptedInvite) {
      throw new BadRequestException(ResponseMessages.ALREADY_ACCEPTED_INVITE);
    }
    if (!existRecord) {
      throw new BadRequestException(ResponseMessages.NOT_FOUND_INVITE);
    }

    // change status to `ACCEPTED` by senderId and receiverId
    await this.friendsRepository.updateStatus(senderId, receiverId);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.ACCEPTED_INVITE_SUCCESS,
    };
  }

  async declineInvite(
    senderId: string,
    receiverId: string,
  ): Promise<ResponseFormat<any>> {
    // check exist receiver and check already don't accepted invite
    const [sender, record] = await Promise.all([
      this.usersRepository.findOneById(senderId),
      this.friendsRepository.findOne(senderId, receiverId, StatusEnum.PENDING),
    ]);
    if (!sender) {
      throw new BadRequestException(ResponseMessages.NOT_FOUND_SENDER);
    }
    if (!record) {
      throw new BadRequestException(ResponseMessages.NOT_FOUND_INVITE);
    }

    // delete record
    await this.friendsRepository.deleteByReceiver(senderId, receiverId);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.DECLINEED_INVITE_SUCCESS,
    };
  }
}
