import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//     allowedHeaders: ['Authorization'],
//     credentials: true,
//   },
// })
// export class SocketGateway implements OnGatewayConnection {
//   @WebSocketServer()
//   private server: Server;

//   constructor(private readonly socketService: SocketService) {}

//   handleConnection(socket: Socket): void {
//     this.socketService.handleConnection(socket);
//   }

//   // Implement other Socket.IO event handlers and message handlers
// }


@WebSocketGateway()
export class SocketGateway {
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
  }
}
