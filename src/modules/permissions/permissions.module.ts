import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { permissionsProviders } from './permissions.provider';
import { PermissionsRepository } from './permissions.repository';

@Module({
  providers: [
    PermissionsService,
    PermissionsRepository,
    ...permissionsProviders,
  ],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
