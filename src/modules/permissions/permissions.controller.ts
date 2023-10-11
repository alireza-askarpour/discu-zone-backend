import { ApiTags } from '@nestjs/swagger';
import { Body, Param, Controller, ParseUUIDPipe } from '@nestjs/common';

import { PermissionsService } from './permissions.service';

import { PermissionCreateDto } from './dtos/create-permission.dto';
import { PermissionUpdateDto } from './dtos/update-permission.dto';

import { GetPermissionsDecorator } from './decorators/get-permissions.decorator';
import { CreatePermissionDecorator } from './decorators/create-permission.decorator';
import { UpdatePermissionDecorator } from './decorators/update-permission.decorator';
import { DeletePermissionDecorator } from './decorators/delete-permission.decorator';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @GetPermissionsDecorator()
  getPermissions() {
    return this.permissionsService.findAll();
  }

  @CreatePermissionDecorator()
  create(@Body() createDto: PermissionCreateDto) {
    return this.permissionsService.create(createDto);
  }

  @UpdatePermissionDecorator()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: PermissionUpdateDto,
  ) {
    return this.permissionsService.update(id, data);
  }

  @DeletePermissionDecorator()
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.permissionsService.delete(id);
  }
}
