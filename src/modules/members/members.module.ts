import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { memberProviders } from './members.providers';
import { MembersRepository } from './members.repository';

@Module({
  providers: [MembersService, MembersRepository, ...memberProviders],
  controllers: [MembersController],
})
export class MembersModule {}
