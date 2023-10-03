import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { serversProviders } from './servers.provider';
import { ServersRepository } from './servers.repository';

@Module({
  imports: [],
  providers: [ServersRepository, ServersService, ...serversProviders],
  controllers: [ServersController],
  exports: [ServersRepository],
})
export class ServersModule {}
