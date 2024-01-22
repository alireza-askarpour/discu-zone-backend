import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

import { User } from './entities/user.entity';
import { USER_REPOSITORY } from 'src/common/constants';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
