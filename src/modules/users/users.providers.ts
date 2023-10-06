import { User } from './user.entity';
import { USER_REPOSITORY } from 'src/common/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
