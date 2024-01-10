import { RedisOptions } from 'ioredis';
import { IJwt } from './jwt.interface';
import { IOAuth2 } from './oauth.interface';
import { IEmailConfig } from './email-config.interface';
import { IDatabaseConfig } from './database.interface';

export interface IConfig {
  readonly id: string;
  readonly url: string;
  readonly port: number;
  readonly domain: string;
  readonly db: IDatabaseConfig;
  readonly mode: string;
  readonly jwt: IJwt;
  readonly emailService: IEmailConfig;
  readonly oauth2: IOAuth2;
  readonly redis: RedisOptions;
}
