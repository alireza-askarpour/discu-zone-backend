import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, ParseUUIDPipe, Query } from '@nestjs/common';

import { MembersService } from './members.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JoinMemberToServer } from './decorators/join-member-to-server.decorator';
import { GetServerMembersDecorator } from './decorators/get-server-members.decorator';

@ApiBearerAuth()
@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  // get members list from a server
  @GetServerMembersDecorator()
  getAllMembers(@Query('serverId', ParseUUIDPipe) serverId: string) {
    return this.membersService.getServerMembersList(serverId);
  }

  // join member to server
  @JoinMemberToServer()
  joinMemberToServer(
    @Param('slug') slug: string,
    @CurrentUser('id') id: string,
  ) {
    return this.membersService.joinMemberToServer(id, slug);
  }
}
