import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { SendInviteDto } from './dtos/send-invite.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Friends')
@ApiBearerAuth()
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('send-invite')
  async sendRequest(
    @CurrentUser('id') id: string,
    @Body() sendInviteDto: SendInviteDto,
  ) {
    return this.friendsService.sentInvite(id, sendInviteDto.username);
  }
}
