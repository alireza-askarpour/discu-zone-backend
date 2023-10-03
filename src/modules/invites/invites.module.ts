import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { invitesProviders } from './invites.providers';
import { InvitesRepository } from './invites.repository';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [ServersModule],
  providers: [InvitesService, InvitesRepository, ...invitesProviders],
  controllers: [InvitesController],
})
export class InvitesModule {}
