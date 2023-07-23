import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { PermissionsRepository } from './permissions.repository';
import { PermissionCreateDto } from './dtos/create-permission.dto';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { ResponseFormat } from '../../core/interfaces/response.interface';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

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
}
