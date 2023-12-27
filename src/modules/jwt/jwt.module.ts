import { Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { UsersModule } from '../users/users.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [_JwtModule, UsersModule, CommonModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
