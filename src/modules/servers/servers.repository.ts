import { Inject, Injectable } from '@nestjs/common';
import { Server } from './servers.entity';

@Injectable()
export class ServersRepository {
  constructor(@Inject() private readonly serverModel: typeof Server) {}
}
