import { Module } from '@nestjs/common';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { rolesProviders } from './roles.provider';
import { RolesRepository } from './roles.repository';

@Module({
  providers: [RolesService, RolesRepository, ...rolesProviders],
  controllers: [RolesController],
})
export class RolesModule {}
