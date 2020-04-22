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
  handleMessage(client: Socket, payload: any): void {
    const { username, message, groupname } = payload;
    if (!username || !message || !groupname) throw new Error('Missing data')
    const res = this.userService.sendMessage({ groupname, username, message });
    this.server.emit('msgToClient', res);
  }

  @SubscribeMessage('join')
  handleJoinGroup(client: Socket, payload: any): void {
    const { username, groupname } = payload;
    if (!username || !groupname) throw new Error('Missing data')
    const res = this.userService.joinGroup({ groupname, username });
    // const res = `Connected ${username} ${groupname}`;
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
