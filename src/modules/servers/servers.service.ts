import { HttpStatus, Injectable } from '@nestjs/common';
import { ServersRepository } from './servers.repository';
import { ServerCreateDto } from './dtos/create-server.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class ServersService {
  constructor(private serversRepository: ServersRepository) {}

  async createServer(data: ServerCreateDto): Promise<ResponseFormat<any>> {
    const server = await this.serversRepository.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.SERVER_CREATED_SUCCESS,
      data: {
        server,
      },
    };
  }
}
