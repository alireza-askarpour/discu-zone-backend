import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

export const SwaggerConfig = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('DiscuZone')
    .setDescription(
      'DiscuZone is a platform for online communication that enables voice, video, and text-based interactions. This application facilitates synchronous and coordinated communication among individuals through features such as text chats, voice calls, and video calls. Users can engage in conversations and share content, images, and files in private or public groups and channels.',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };
  SwaggerModule.setup('api-docs', app, document, options);
};
