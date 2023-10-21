import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [_JwtModule, UsersModule],
  providers: [JwtService],
})
export class JwtModule {}
