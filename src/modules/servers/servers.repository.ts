import { Inject, Injectable } from '@nestjs/common';
import { Server } from './servers.entity';
import { SERVER_REPOSITORY } from 'src/common/constants';
import { ServerCreateInput } from 'src/common/interfaces/server.interface';

@Injectable()
export class ServersRepository {
  constructor(
    @Inject(SERVER_REPOSITORY) private readonly serverModel: typeof Server,
  ) {}

  create(data: ServerCreateInput) {
    return this.serverModel.create(data);
  }

  updateById(id: string, data: Partial<Server>) {
    return this.serverModel.update(data, { where: { id } });
  }

  findById(id: string) {
    return this.serverModel.findOne({ where: { id } });
  }
}
