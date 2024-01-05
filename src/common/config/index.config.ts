import { join } from 'path';
import { readFileSync } from 'fs';
import { isUndefined } from '../utils/validation.util';
import { IConfig } from './interfaces/config.interface';
import { redisUrlParser } from '../utils/redis-url-parser.util';

export const config = (): IConfig => {
  const publicKey = readFileSync(
    join(__dirname, '..', '..', '..', 'keys/public.key'),
    'utf-8',
  );
  const privateKey = readFileSync(
    join(__dirname, '..', '..', '..', 'keys/private.key'),
    'utf-8',
  );

  return {
    id: process.env.APP_ID,
    url: process.env.URL,
    port: parseInt(process.env.PORT) || 3000,
    domain: process.env.DOMAIN,
    mode: process.env.NODE_ENV || 'development',
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      dialect: process.env.DB_DIALECT,
      nameTest: process.env.DB_NAME_TEST,
      nameDevelopment: process.env.DB_NAME_DEVELOPMENT,
      nameProduction: process.env.DB_NAME_PRODUCTION,
    },
    jwt: {
      access: {
        privateKey,
        publicKey,
        time: parseInt(process.env.JWT_ACCESS_TIME, 10),
      },
      confirmation: {
        secret: process.env.JWT_CONFIRMATION_SECRET,
        time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
      },
      resetPassword: {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
        time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        time: parseInt(process.env.JWT_REFRESH_TIME, 10),
      },
    },
    emailService: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    redis: redisUrlParser(process.env.REDIS_URL),
    oauth2: {
      google:
        isUndefined(process.env.GOOGLE_CLIENT_ID) ||
        isUndefined(process.env.GOOGLE_CLIENT_SECRET)
          ? null
          : {
              id: process.env.GOOGLE_CLIENT_ID,
              secret: process.env.GOOGLE_CLIENT_SECRET,
            },
      discord:
        isUndefined(process.env.DISCORD_CLIENT_ID) ||
        isUndefined(process.env.DISCORD_CLIENT_SECRET)
          ? null
          : {
              id: process.env.DISCORD_CLIENT_ID,
              secret: process.env.DISCORD_CLIENT_SECRET,
            },
    },
  };
};
