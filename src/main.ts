import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SwaggerConfig } from './core/config/swagger.config';
import { port, appListener, isDevelopment } from './core/config/app.config';

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
