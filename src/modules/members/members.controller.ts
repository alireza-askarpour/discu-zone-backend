import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, ParseUUIDPipe, Query } from '@nestjs/common';

import { MembersService } from './members.service';
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
}
