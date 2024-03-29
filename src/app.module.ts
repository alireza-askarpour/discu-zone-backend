import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { config } from './config/index.config';
import { CacheConfig } from './config/cache.config';
import { validationSchema } from './config/schema/config.schema';

import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServersModule } from './modules/servers/servers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FileModule } from './modules/file/file.module';
import { InvitesModule } from './modules/invites/invites.module';
import { MembersModule } from './modules/members/members.module';
import { SocketModule } from './modules/socket/socket.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { Oauth2Module } from './modules/oauth2/oauth2.module';
import { MailModule } from './modules/mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { FriendsModule } from './modules/friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: CacheConfig,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
    ServersModule,
    CategoriesModule,
    FileModule,
    InvitesModule,
    MembersModule,
    SocketModule,
    JwtModule,
    Oauth2Module,
    MailModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
