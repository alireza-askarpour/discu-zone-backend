import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendDto } from './dtos/friend.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Friends')
@ApiBearerAuth()
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('send-invite')
  async sendRequest(
    @CurrentUser('id') senderId: string,
    @Body() sendInviteDto: FriendDto,
  ) {
    return this.friendsService.sentInvite(senderId, sendInviteDto.username);
  }

  @Post('cancel-invite/:receiverId')
  async cancelRequest(
    @CurrentUser('id') senderId: string,
    @Param('receiverId', ParseUUIDPipe) receiverId: string,
  ) {
    return this.friendsService.cancelInvite(senderId, receiverId);
  }

  @Post('accept-invite/:receiverId')
  async acceptRequest(
    @Param('receiverId', ParseUUIDPipe) receiverId: string,
    @CurrentUser('id') senderId: string,
  ) {
    return this.friendsService.acceptInvite(senderId, receiverId);
  }

  @Post('decline-invite/:senderId')
  async declineRequest(
    @Param('senderId', ParseUUIDPipe) senderId: string,
    @CurrentUser('id') receiverId: string,
  ) {
    return this.friendsService.declineInvite(senderId, receiverId);
  }
}
