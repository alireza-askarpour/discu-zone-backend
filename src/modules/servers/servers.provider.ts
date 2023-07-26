import { SERVER_REPOSITORY } from 'src/core/constants';
import { Server } from './servers.entity';

export const serversProviders = [
  {
    provide: SERVER_REPOSITORY,
    useValue: Server,
  },
];
