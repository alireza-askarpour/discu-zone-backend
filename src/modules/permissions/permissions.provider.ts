import { Permissions } from './permissions.entity';
import { PERMISSIONS_REPOSITORY } from 'src/core/constants';

export const permissionsProviders = [
  {
    provide: PERMISSIONS_REPOSITORY,
    useValue: Permissions,
  },
];
