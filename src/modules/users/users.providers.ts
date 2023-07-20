import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
