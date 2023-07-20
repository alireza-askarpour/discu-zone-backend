import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, ...userProviders],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
