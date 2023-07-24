import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RolesService } from './roles.service';
import { RoleCreateDto } from './dtos/create-role.dto';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { createJoiSchema } from './schemas/create-role.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreateRole } from './docs/create-role.doc';
import { ApiGetRoles } from './docs/get-roles.doc';
import { AuthGuard } from '@nestjs/passport';
import { RoleUpdateDto } from './dtos/update-role.dto';
import { IdDto } from 'src/core/dtos/id.dto';

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
  @ApiCreateRole()
  update(@Param(ValidationPipe) { id }: IdDto, @Body() data: RoleUpdateDto) {
    return this.rolesService.update(id, data);
  }
}
