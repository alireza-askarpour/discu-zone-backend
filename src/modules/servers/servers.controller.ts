import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Req } from '@nestjs/common';

import { ServersService } from './servers.service';
import { ServerCreateDto } from './dtos/create-server.dto';
import { CreateServerDecorator } from './decorators/create-server.decorator';
import { UpdateServerDecorator } from './decorators/update-server.decorator';

@ApiBearerAuth()
@ApiTags('Servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serverService: ServersService) {}

  @CreateServerDecorator()
  createServer(@Body() data: ServerCreateDto, @Req() req: Request) {
    data.owner = req.user.id;
    return this.serverService.createServer(data);
  }

  @UpdateServerDecorator()
  updateServer(@Body() data: ServerCreateDto, @Param('id') id: string) {
    return this.serverService.updateServer(id, data);
  }
}
