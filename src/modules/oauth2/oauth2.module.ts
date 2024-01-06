import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '../jwt/jwt.module';
import { Oauth2Service } from './oauth2.service';
import { UsersModule } from '../users/users.module';
import { Oauth2Controller } from './oauth2.controller';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [Oauth2Service],
  controllers: [Oauth2Controller],
})
export class Oauth2Module {}
