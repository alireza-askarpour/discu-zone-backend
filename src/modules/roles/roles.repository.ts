import { Inject, Injectable } from '@nestjs/common';

import { ROLES_REPOSITORY } from 'src/core/constants';
import { Roles } from './roles.entity';
import { RoleCreateDto } from './dtos/create-role.dto';
import { RoleUpdateDto } from './dtos/update-role.dto';

@Injectable()
export class RolesRepository {
  constructor(@Inject(ROLES_REPOSITORY) private readonly roles: typeof Roles) {}

  async findById(id: string) {
    return await this.roles.findByPk(id);
  }

  async findAll() {
    return await this.roles.findAll();
  }

  async create(data: RoleCreateDto) {
    return await this.roles.create(data);
  }

  async update(id: string, data: RoleUpdateDto) {
    return await this.roles.update(data, { where: { id } });
  }
}
