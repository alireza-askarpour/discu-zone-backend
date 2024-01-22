import { Body, Controller, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SendInviteDto } from './dtos/send-invite.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('send-invite')
  async sendRequest(
    @CurrentUser('id') userId: string,
    @Body() sendInviteDto: SendInviteDto,
  ) {
    return this.friendsService.sentInvite(userId, sendInviteDto.username);
  }
}
