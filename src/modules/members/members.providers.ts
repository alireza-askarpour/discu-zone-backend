import { Member } from './member.entity';
import { MEMBER_REPOSITORY } from 'src/common/constants';

export const memberProviders = [
  {
    provide: MEMBER_REPOSITORY,
    useValue: Member,
  },
];
