import { Roles } from './roles.entity';
import { ROLES_REPOSITORY } from 'src/common/constants';

export const rolesProviders = [
  {
    provide: ROLES_REPOSITORY,
    useValue: Roles,
  },
];
