import { Inject, Injectable } from '@nestjs/common';
import { Server } from './servers.entity';
import { SERVER_REPOSITORY } from 'src/core/constants';
import { ServerCreateDto } from './dtos/create-server.dto';

@Injectable()
export class ServersRepository {
  constructor(
    @Inject(SERVER_REPOSITORY) private readonly serverModel: typeof Server,
  ) {}

  create(data: ServerCreateDto) {
    return this.serverModel.create(data);
  }

  updateById(id: string, data: Partial<Server>) {
    return this.serverModel.update(data, { where: { id } });
  }

  findById(id: string) {
    return this.serverModel.findOne({ where: { id } });
  }
}
