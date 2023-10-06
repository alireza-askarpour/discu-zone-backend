import {
  Body,
  Param,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PermissionsService } from './permissions.service';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { createPermissionSchema } from './schemas/create-permission.schema';

import { IdDto } from 'src/common/dtos/id.dto';
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
  @UsePipes(new JoiValidationPipe(createPermissionSchema))
  create(@Body() createDto: PermissionCreateDto) {
    return this.permissionsService.create(createDto);
  }

  @UpdatePermissionDecorator()
  update(
    @Param(ValidationPipe) { id }: IdDto,
    @Body() data: PermissionUpdateDto,
  ) {
    return this.permissionsService.update(id, data);
  }

  @DeletePermissionDecorator()
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.permissionsService.delete(id);
  }
}
