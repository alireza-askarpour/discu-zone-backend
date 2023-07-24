import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { PermissionsService } from './permissions.service';
import { createPermissionSchema } from './schemas/create-permission.schema';
import { PermissionCreateDto } from './dtos/create-permission.dto';
import { ApiCreatePermission } from './docs/create-permission.doc';
import { PermissionUpdateDto } from './dtos/update-permission.dto';
import { IdDto } from 'src/core/dtos/id.dto';
import { ApiGetPermissions } from './docs/get-permissions.doc';
import { ApiUpdatePermission } from './docs/update-permission.doc';
import { ApiDeletePermission } from './docs/delete-permission.doc';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get()
  @ApiGetPermissions()
  getPermissions() {
    return this.permissionsService.findAll();
  }

  @Post()
  @ApiCreatePermission()
  @UsePipes(new JoiValidationPipe(createPermissionSchema))
  create(@Body() createDto: PermissionCreateDto) {
    return this.permissionsService.create(createDto);
  }

  @Patch(':id')
  @ApiUpdatePermission()
  update(
    @Param(ValidationPipe) { id }: IdDto,
    @Body() data: PermissionUpdateDto,
  ) {
    return this.permissionsService.update(id, data);
  }

  @Delete(':id')
  @ApiDeletePermission()
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.permissionsService.delete(id);
  }
}
