import { Module, forwardRef } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { memberProviders } from './members.providers';
import { MembersRepository } from './members.repository';
import { InvitesModule } from '../invites/invites.module';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [forwardRef(() => InvitesModule), forwardRef(() => ServersModule)],
  providers: [MembersService, MembersRepository, ...memberProviders],
  controllers: [MembersController],
  exports: [MembersRepository],
})
export class MembersModule {}
