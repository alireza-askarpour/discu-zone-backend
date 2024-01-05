import { bold } from 'chalk';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const mode = configService.get('mode');
  const cookieSecret = configService.get<string>('COOKIE_SECRET');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser(cookieSecret));

  SwaggerConfig(app);

  await app.listen(port, () => {
    const runningMode = `Server running in ${bold(mode)} mode`;
    const runningOnPort = `on port ${bold(port)}`;
    const runningSince = `[since ${new Date().toISOString()}]`;
    console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
  });
}
bootstrap();
