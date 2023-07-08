import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appListener } from './config/app.config';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app);
  await app.listen(process.env.PORT, appListener);
}
bootstrap();
