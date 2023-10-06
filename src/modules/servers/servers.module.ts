import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { serversProviders } from './servers.provider';
import { ServersRepository } from './servers.repository';
import { ServersController } from './servers.controller';

@Module({
  imports: [],
  providers: [ServersRepository, ServersService, ...serversProviders],
  controllers: [ServersController],
  exports: [ServersRepository],
})
export class ServersModule {}
