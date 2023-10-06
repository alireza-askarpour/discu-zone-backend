import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SwaggerConfig } from './common/config/swagger.config';
import { port, appListener, isDevelopment } from './common/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  if (isDevelopment) SwaggerConfig(app);

  await app.listen(port, appListener);
}
bootstrap();
