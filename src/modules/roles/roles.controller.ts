import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';

import { IdDto } from 'src/core/dtos/id.dto';
import { RoleCreateDto } from './dtos/create-role.dto';
import { RoleUpdateDto } from './dtos/update-role.dto';
import { createJoiSchema } from './schemas/create-role.schema';

import { ApiGetRoles } from './docs/get-roles.doc';
import { ApiCreateRole } from './docs/create-role.doc';
import { ApiUpdateRole } from './docs/update-role.doc';
import { ApiDeleteRole } from './docs/delete-role.doc';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiGetRoles()
  getRoles() {
    return this.rolesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiCreateRole()
  @UsePipes(new JoiValidationPipe(createJoiSchema))
  create(@Body() data: RoleCreateDto) {
    return this.rolesService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiUpdateRole()
  update(@Param(ValidationPipe) { id }: IdDto, @Body() data: RoleUpdateDto) {
    return this.rolesService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiDeleteRole()
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.rolesService.delete(id);
  }
}
