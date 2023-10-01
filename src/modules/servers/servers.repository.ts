import { Inject, Injectable } from '@nestjs/common';
import { Server } from './servers.entity';
import { ServerCreateDto } from './dtos/create-server.dto';
import { SERVER_REPOSITORY } from 'src/core/constants';
import { ServerUpdateDto } from './dtos/update-server.dto';

@Injectable()
export class ServersRepository {
  constructor(
    @Inject(SERVER_REPOSITORY) private readonly serverModel: typeof Server,
  ) {}

  create(data: ServerCreateDto) {
    return this.serverModel.create(data);
  }

  update(id: string, data: ServerUpdateDto) {
    return this.serverModel.update(data, { where: { id } });
  }
}
