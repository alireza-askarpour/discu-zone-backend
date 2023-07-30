import { bold } from 'chalk';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';

export interface Configs {
  PORT: number;
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASS: string;
  DB_DIALECT: string;
  DB_NAME_TEST: string;
  DB_NAME_DEVELOPMENT: string;
  DB_NAME_PRODUCTION: string;
  JWTKEY: string;
  TOKEN_EXPIRATION: string;
  BEARER: string;
}

export default (): Configs => ({
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_NAME_TEST: process.env.DB_NAME_TEST,
  DB_NAME_DEVELOPMENT: process.env.DB_NAME_DEVELOPMENT,
  DB_NAME_PRODUCTION: process.env.DB_NAME_PRODUCTION,
  JWTKEY: process.env.JWTKEY,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
  BEARER: process.env.BEARER,
});

export const configService: ConfigService<Configs> =
  new ConfigService<Configs>();

export const isProduction = configService.get('NODE_ENV') === 'development';
export const isDevelopment = configService.get('NODE_ENV') === 'development';

export const port = configService.get('PORT') || 3000;
export const mode = configService.get('NODE_ENV') || 'development';

export const documentRoute = '/api-docs';

export const appListener = () => {
  const runningMode = `Server running in ${bold(mode)} mode`;
  const runningOnPort = `on port ${bold(port)}`;
  const runningSince = `[since ${new Date().toISOString()}]`;
  console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
  if (isDevelopment) console.log(
    `🏁 —> RestApi: ${bold(`http://localhost:${port}${documentRoute}`)}`,
  );
};
