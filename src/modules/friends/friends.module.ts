import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { Friend } from './entities/friend.entity';
import { FRIEND_REPOSITORY } from 'src/common/constants';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [
    FriendsService,
    FriendsRepository,
    {
      provide: FRIEND_REPOSITORY,
      useValue: Friend,
    },
  ],
  controllers: [FriendsController],
})
export class FriendsModule {}
