import { Inject, Injectable } from '@nestjs/common';
import { Server } from './server.entity';

@Injectable()
export class ServerRepository {
  constructor(@Inject() private readonly serverModel: typeof Server) {}
}
