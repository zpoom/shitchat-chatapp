import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UserService } from './user/user.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private userService: UserService;

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('join')
  handleJoinGroup(client: Socket, payload: any): void {
    // const res = this.userService.joinGroup(payload.groupname, payload.username);
    const res = `Connected ${payload.username} ${payload.groupname}`;
    this.server.emit('joined', res);

  }
  afterInit(server: Server) {
    this.logger.log('init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
}
