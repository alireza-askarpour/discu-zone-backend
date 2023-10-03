import { Invite } from './invite.entity';
import { INVITE_REPOSITORY } from 'src/core/constants';

export const invitesProviders = [
  {
    provide: INVITE_REPOSITORY,
    useValue: Invite,
  },
];
