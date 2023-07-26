import { Body, Controller, Post } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerCreateDto } from './dtos/create-server.dto';

@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  create(@Body() data: ServerCreateDto) {}
}
