import { Permissions } from './permissions.entity';
import { PERMISSIONS_REPOSITORY } from 'src/common/constants';

export const permissionsProviders = [
  {
    provide: PERMISSIONS_REPOSITORY,
    useValue: Permissions,
  },
];
