import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param } from '@nestjs/common';

import { InvitesService } from './invites.service';
import { createInviteSchema } from './schemas/create-invite.schema';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateInviteDecorator } from './decorators/create-invite.decorator';

import { InviteCreateDto } from './dtos/create-invite.dto';
import { joiValidator } from 'src/common/utils/joi-validator.util';

@ApiBearerAuth()
@ApiTags('Invites')
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @CreateInviteDecorator()
  create(
    @Body() data: InviteCreateDto,
    @CurrentUser('id') userId: string,
    @Param('serverId') serverId: string,
  ) {
    joiValidator(createInviteSchema, data);
    return this.invitesService.create(userId, serverId, data);
  }
}
