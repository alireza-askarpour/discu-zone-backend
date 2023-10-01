import { Request } from 'express';
import { Body, Controller, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ServersService } from './servers.service';
import { ServerCreateDto } from './dtos/create-server.dto';
import { CreateServerDecorator } from './decorators/create-server.decorator';

@ApiBearerAuth()
@ApiTags('Servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serverService: ServersService) {}

  @CreateServerDecorator()
  create(@Body() data: ServerCreateDto, @Req() req: Request) {
    data.owner = req.user.id;
    return this.serverService.createServer(data);
  }
}
