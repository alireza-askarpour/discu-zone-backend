import { Invite } from './invite.entity';
import { INVITE_REPOSITORY } from 'src/common/constants';

export const invitesProviders = [
  {
    provide: INVITE_REPOSITORY,
    useValue: Invite,
  },
];
