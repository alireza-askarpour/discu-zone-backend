import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { RolesService } from './roles.service';
import { RoleCreateDto } from './dtos/create-role.dto';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { createJoiSchema } from './schemas/create-role.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreateRole } from './docs/create-role.doc';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @ApiCreateRole()
  @UsePipes(new JoiValidationPipe(createJoiSchema))
  create(@Body() data: RoleCreateDto) {
    return this.rolesService.create(data);
  }
}
