import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PermissionsRepository } from './permissions.repository';
import { PermissionCreateDto } from './dtos/create-permission.dto';
import { PermissionUpdateDto } from './dtos/update-permission.dto';
import { ResponseFormat } from '../../common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async findAll(): Promise<ResponseFormat<any>> {
    const permissions = await this.permissionsRepository.findAll();
    return { statusCode: HttpStatus.CREATED, data: { permissions } };
  }

  async create(input: PermissionCreateDto): Promise<ResponseFormat<any>> {
    const existPermission = await this.permissionsRepository.findByName(
      input.name,
    );
    if (existPermission) {
      throw new BadRequestException(ResponseMessages.NAME_ALREADY_EXIST);
    }

    const createdPermissions = await this.permissionsRepository.create(input);
    const permissions = createdPermissions.dataValues;

    return { statusCode: HttpStatus.CREATED, data: { permissions } };
  }

  async update(
    id: string,
    data: PermissionUpdateDto,
  ): Promise<ResponseFormat<any>> {
    const existPermissionById = await this.permissionsRepository.findByPk(id);
    if (!existPermissionById) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_PERMISSION);
    }

    const existPermissionByName = await this.permissionsRepository.findByName(
      data.name,
    );
    if (existPermissionByName) {
      throw new BadRequestException(ResponseMessages.NAME_ALREADY_EXIST);
    }

    const [updateCount] = await this.permissionsRepository.update(id, data);
    if (updateCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_PERMISSION,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.UPDATED_PERMISSION,
    };
  }

  async delete(id: string): Promise<ResponseFormat<any>> {
    const existPermission = await this.permissionsRepository.findByPk(id);
    if (!existPermission) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_PERMISSION);
    }

    const deletedCount = await this.permissionsRepository.delete(id);
    if (deletedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_PERMISSION,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.DELETED_PERMISSION,
    };
  }
}
