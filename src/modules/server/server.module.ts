import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { serverProviders } from './server.provider';

@Module({
  providers: [ServerService, ...serverProviders],
  controllers: [ServerController],
})
export class ServerModule {}
