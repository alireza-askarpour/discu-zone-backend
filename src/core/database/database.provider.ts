import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

// Models
import { User } from 'src/modules/users/user.entity';
import { Permissions } from 'src/modules/permissions/permissions.entity';
import { Roles } from 'src/modules/roles/roles.entity';
import { Server } from 'src/modules/servers/servers.entity';
import { Category } from 'src/modules/categories/categories.entity';
import { Invite } from 'src/modules/invites/invite.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Permissions, Roles, Server, Category, Invite]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
