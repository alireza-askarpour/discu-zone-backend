import { Inject, Injectable } from '@nestjs/common';
import { PERMISSIONS_REPOSITORY } from 'src/core/constants';
import { Permissions } from './permissions.entity';
import { PermissionCreateDto } from './dtos/create-permission.dto';

@Injectable()
export class PermissionsRepository {
  constructor(
    @Inject(PERMISSIONS_REPOSITORY)
    private readonly permissions: typeof Permissions,
  ) {}

  async create(input: PermissionCreateDto) {
    return await this.permissions.create(input);
  }

  async findByName(name: string) {
    return await this.permissions.findOne({ where: { name } });
  }
}
