import { Inject, Injectable } from '@nestjs/common';
import { Permissions } from './permissions.entity';
import { PERMISSIONS_REPOSITORY } from 'src/core/constants';
import { PermissionCreateDto } from './dtos/create-permission.dto';
import { PermissionUpdateDto } from './dtos/update-permission.dto';

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

  async findAll() {
    return await this.permissions.findAll();
  }

  async update(id: string, data: PermissionUpdateDto) {
    return await this.permissions.update(data, { where: { id } });
  }

  async findByPk(id: string) {
    return await this.permissions.findByPk(id);
  }

  async delete(id: string) {
    return await this.permissions.destroy({ where: { id } });
  }
}
