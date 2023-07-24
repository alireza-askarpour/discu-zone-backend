import { Inject, Injectable } from '@nestjs/common';
import { ROLES_REPOSITORY } from 'src/core/constants';
import { Roles } from './roles.entity';
import { RoleCreateDto } from './dtos/create-role.dto';

@Injectable()
export class RolesRepository {
  constructor(@Inject(ROLES_REPOSITORY) private readonly roles: typeof Roles) {}

  async create(data: RoleCreateDto) {
    return await this.roles.create(data);
  }
}
