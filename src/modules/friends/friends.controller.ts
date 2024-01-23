import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
    @CurrentUser('id') sencerId: string,
    @Body() sendInviteDto: FriendDto,
  ) {
    return this.friendsService.sentInvite(sencerId, sendInviteDto.username);
  }

  @Post('cancel-invite/:receiverId')
  async cancelRequest(
    @CurrentUser('id') sencerId: string,
    @Param('receiverId', ParseUUIDPipe) receiverId: string,
  ) {
    return this.friendsService.cancelInvite(sencerId, receiverId);
  }

  @Post('accept-invite/:receiverId')
  async acceptRequest(
    @Param('receiverId', ParseUUIDPipe) receiverId: string,
    @CurrentUser('id') sencerId: string,
  ) {
    return this.friendsService.acceptInvite(sencerId, receiverId);
  }
}
