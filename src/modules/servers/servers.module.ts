import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { serversProviders } from './servers.provider';

@Module({
  providers: [ServersService, ...serversProviders],
  controllers: [ServersController],
})
export class ServersModule {}
