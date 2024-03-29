import { bold } from 'chalk';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieSignature from 'cookie-signature';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger.config';
import { AsyncApiConfig } from './config/async-api.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const mode = configService.get('mode');
  const cookieSecret = configService.get<string>('COOKIE_SECRET');
  const restDocumentPath = configService.get<string>('documentRoutes.rest');
  const socketDocumentPath = configService.get<string>('documentRoutes.socket');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser(cookieSecret));

  // const cookieValue = 'your-cookie-value';
  // const _cookieSecret = 'your-cookie-secret';
  // const signedCookie = cookieSignature.sign(cookieValue, _cookieSecret);

  // console.log('Original Cookie:', cookieValue);
  // console.log('Signed Cookie:', signedCookie);

  SwaggerConfig(app, restDocumentPath);
  await AsyncApiConfig(app, port, socketDocumentPath);

  await app.listen(port, () => {
    const runningMode = `Server running in ${bold(mode)} mode`;
    const runningOnPort = `on port ${bold(port)}`;
    const runningSince = `[since ${new Date().toISOString()}]`;
    console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
  });
}
bootstrap();
