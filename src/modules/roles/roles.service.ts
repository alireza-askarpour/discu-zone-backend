import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}
}
