import { Module } from '@nestjs/common';

import { RolesService } from './roles.service';
import { rolesProviders } from './roles.provider';
import { RolesRepository } from './roles.repository';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService, RolesRepository, ...rolesProviders],
  controllers: [RolesController],
})
export class RolesModule {}
