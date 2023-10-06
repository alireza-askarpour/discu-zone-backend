import {
  Body,
  Param,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { createJoiSchema } from './schemas/create-role.schema';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';

import { IdDto } from 'src/common/dtos/id.dto';
import { RoleCreateDto } from './dtos/create-role.dto';
import { RoleUpdateDto } from './dtos/update-role.dto';

import { GetRolesDecoratpr } from './decorators/get-roles.decorator';
import { CreateRoleDecorator } from './decorators/create-role.decorator';
import { UpdateRoleDecorator } from './decorators/update-role.decorator';
import { DeleteRoleDecorator } from './decorators/delete-role.decorator';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @GetRolesDecoratpr()
  getRoles() {
    return this.rolesService.findAll();
  }

  @CreateRoleDecorator()
  @UsePipes(new JoiValidationPipe(createJoiSchema))
  create(@Body() data: RoleCreateDto) {
    return this.rolesService.create(data);
  }

  @UpdateRoleDecorator()
  update(@Param(ValidationPipe) { id }: IdDto, @Body() data: RoleUpdateDto) {
    return this.rolesService.update(id, data);
  }

  @DeleteRoleDecorator()
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.rolesService.delete(id);
  }
}
