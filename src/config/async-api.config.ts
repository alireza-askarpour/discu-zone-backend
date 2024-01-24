import {
  AsyncApiModule,
  AsyncServerObject,
  AsyncApiDocumentBuilder,
} from 'nestjs-asyncapi';
import { INestApplication } from '@nestjs/common';

const brandName = 'DiscuZone';

export const AsyncApiConfig = async (
  app: INestApplication,
  port: number,
  path: string,
): Promise<void> => {
  try {
    const asyncApiServer: AsyncServerObject = {
      url: `ws://localhost:${port}`,
      protocol: 'socket.io',
      protocolVersion: '4',
      description:
        'Allows you to connect using the websocket protocol to our Socket.io server.',
      security: [{ 'user-password': [] }],
      variables: {
        port: {
          description: `Secure connection (TLS) is available through port ${port}.`,
          default: '81',
        },
      },
      bindings: {},
    };

    const asyncApiOptions = new AsyncApiDocumentBuilder()
      .setTitle(brandName + ' SocketIO')
      .setDescription(brandName + ' SocketIO description here')
      .setVersion('1.0')
      .setDefaultContentType('application/json')
      .addSecurity('user-password', { type: 'userPassword' })
      .addServer(brandName + '-server', asyncApiServer)
      .build();
    const asyncapiDocument = AsyncApiModule.createDocument(
      app,
      asyncApiOptions,
    );
    await AsyncApiModule.setup(path, app, asyncapiDocument);
  } catch (e) {
    process.exit(0);
  }
};
