import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { serversProviders } from './servers.provider';
import { ServersRepository } from './servers.repository';
import { ServersController } from './servers.controller';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [MembersModule],
  providers: [ServersRepository, ServersService, ...serversProviders],
  controllers: [ServersController],
  exports: [ServersRepository],
})
export class ServersModule {}
