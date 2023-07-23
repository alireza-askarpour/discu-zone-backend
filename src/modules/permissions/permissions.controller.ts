import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { createPermissionSchema } from './schemas/create-permission.schema';
import { PermissionCreateDto } from './dtos/create-permission.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreatePermission } from './docs/create-permission.doc';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private perimssionsService: PermissionsService) {}

  @Post()
  @ApiCreatePermission()
  @UsePipes(new JoiValidationPipe(createPermissionSchema))
  create(@Body() createDto: PermissionCreateDto) {
    return this.perimssionsService.create(createDto);
  }
}
