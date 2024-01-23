import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { FriendDto } from './dtos/friend.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

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

  @Post('cancel-invite')
  async cancelRequest(
    @CurrentUser('id') sencerId: string,
    @Body() cancelInviteDto: FriendDto,
  ) {
    return this.friendsService.cancelInvite(sencerId, cancelInviteDto.username);
  }
}
