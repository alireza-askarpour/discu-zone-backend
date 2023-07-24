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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: PermissionUpdateDto) {
    return this.permissionsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.permissionsService.delete(id);
  }
}
