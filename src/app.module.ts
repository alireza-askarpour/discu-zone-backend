import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServersModule } from './modules/servers/servers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FileModule } from './modules/file/file.module';
import { InvitesModule } from './modules/invites/invites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
