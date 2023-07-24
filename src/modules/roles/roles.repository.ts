import { Inject, Injectable } from '@nestjs/common';
import { ROLES_REPOSITORY } from 'src/core/constants';
import { Roles } from './roles.entity';

@Injectable()
export class RolesRepository {
  constructor(@Inject(ROLES_REPOSITORY) private readonly roles: Roles) {}
}
