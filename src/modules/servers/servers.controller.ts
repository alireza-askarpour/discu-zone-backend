import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Req, UploadedFile } from '@nestjs/common';

import { ServersService } from './servers.service';
import { ServerCreateDto } from './dtos/create-server.dto';

import { CreateServerDecorator } from './decorators/create-server.decorator';
import { UpdateServerDecorator } from './decorators/update-server.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { DeleteAvatarDecorator } from './decorators/delete-avatar.decorator';

@ApiBearerAuth()
@ApiTags('Servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @CreateServerDecorator()
  createServer(@Body() data: ServerCreateDto, @Req() req: Request) {
    data.owner = req.user.id;
    return this.serversService.createServer(data);
  }

  @UpdateServerDecorator()
  updateServer(@Body() data: ServerCreateDto, @Param('id') id: string) {
    return this.serversService.updateServer(id, data);
  }

  @UploadAvatarDecorator()
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.serversService.uploadAvatar(id, file);
  }

  @DeleteAvatarDecorator()
  deleteAvatar(@Param('id') id: string) {
    return this.serversService.deleteAvatar(id);
  }
}
