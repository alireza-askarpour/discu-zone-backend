import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, UploadedFile } from '@nestjs/common';

import { ServersService } from './servers.service';
import { ServerCreateDto } from './dtos/create-server.dto';

import { CreateServerDecorator } from './decorators/create-server.decorator';
import { UpdateServerDecorator } from './decorators/update-server.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { DeleteAvatarDecorator } from './decorators/delete-avatar.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @CreateServerDecorator()
  createServer(@Body() data: ServerCreateDto, @CurrentUser('id') id: string) {
    return this.serversService.createServer(data, id);
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
