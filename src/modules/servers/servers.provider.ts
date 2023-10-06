import { Server } from './servers.entity';
import { SERVER_REPOSITORY } from 'src/common/constants';

export const serversProviders = [
  {
    provide: SERVER_REPOSITORY,
    useValue: Server,
  },
];
