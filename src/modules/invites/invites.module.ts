import { Module, forwardRef } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { invitesProviders } from './invites.providers';
import { InvitesRepository } from './invites.repository';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [forwardRef(() => ServersModule)],
  providers: [InvitesService, InvitesRepository, ...invitesProviders],
  controllers: [InvitesController],
  exports: [InvitesRepository],
})
export class InvitesModule {}
