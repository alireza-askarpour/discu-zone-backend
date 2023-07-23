import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { PermissionsService } from './permissions.service';
import { createPermissionSchema } from './schemas/create-permission.schema';
import { PermissionCreateDto } from './dtos/create-permission.dto';
import { ApiCreatePermission } from './docs/create-permission.doc';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get()
  getPermissions() {
    return this.permissionsService.findAll();
  }

  @Post()
  @ApiCreatePermission()
  @UsePipes(new JoiValidationPipe(createPermissionSchema))
  create(@Body() createDto: PermissionCreateDto) {
    return this.permissionsService.create(createDto);
  }
}
