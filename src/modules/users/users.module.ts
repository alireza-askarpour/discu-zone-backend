import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ...userProviders],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
