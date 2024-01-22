import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { FriendsGateway } from './gateway/friends.gateway';

@Module({
  providers: [FriendsGateway, SocketService],
})
export class SocketModule {}
