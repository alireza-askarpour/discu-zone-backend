import { Roles } from './roles.entity';
import { ROLES_REPOSITORY } from 'src/core/constants';

export const rolesProviders = [
  {
    provide: ROLES_REPOSITORY,
    useValue: Roles,
  },
];
