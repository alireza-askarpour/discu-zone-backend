import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { FileService } from '../file/file.service';
import { ServersRepository } from './servers.repository';

import { ServerCreateDto } from './dtos/create-server.dto';
import { ServerUpdateDto } from './dtos/update-server.dto';
import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class ServersService {
  constructor(
    private fileService: FileService,
    private serversRepository: ServersRepository,
  ) {}

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

  async updateServer(
    id: string,
    data: ServerUpdateDto,
  ): Promise<ResponseFormat<any>> {
    await this.serversRepository.updateById(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.SERVER_UPDATED_SUCCESS,
    };
  }

  async uploadAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<ResponseFormat<any>> {
    try {
      // check exist file
      if (!file) {
        throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRE);
      }

      // check exist server
      const existServer = await this.serversRepository.findById(id);
      if (!existServer) {
        throw new NotFoundException(ResponseMessages.NOT_FOUND_SERVER);
      }

      // check exist and deleve prev avatar from file system
      if (existServer?.avatar) {
        this.fileService.removeByPath(existServer.avatar);
      }

      // avatar path
      const path = file?.path?.replace(/\\/g, '/');

      const [updateCount] = await this.serversRepository.updateById(id, {
        avatar: path,
      });
      if (updateCount !== 1) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_UPLOAD_AVATAR,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.AVATAR_UPLOADED_SUCCESS,
      };
    } catch (err) {
      const path = file?.path?.replace(/\\/g, '/');
      this.fileService.removeByPath(path);
      throw err;
    }
  }

  async deleteAvatar(id: string): Promise<ResponseFormat<any>> {
    // check exist server
    const existServer = await this.serversRepository.findById(id);
    if (!existServer) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SERVER);
    }

    // check exist and deleve prev avatar from file system
    if (existServer?.avatar) {
      this.fileService.removeByPath(existServer.avatar);
    }

    const [updateCount] = await this.serversRepository.updateById(id, {
      avatar: null,
    });
    if (updateCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_AVATAR,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.AVATAR_DELETED_SUCCESS,
    };
  }
}
