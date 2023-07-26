import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServersService } from './servers.service';
import { ServerCreateDto } from './dtos/create-server.dto';

@ApiTags('Servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serverService: ServersService) {}

  @Post()
  create(@Body() data: ServerCreateDto) {}
}
