import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { port, appListener, isDevelopment } from './core/config/app.config';
import { SwaggerConfig } from './core/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');

  if (isDevelopment) SwaggerConfig(app);

  await app.listen(port, appListener);
}
bootstrap();
