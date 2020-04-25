import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UserService } from './user/user.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private activeClients: { 
    [clientId: string]: { 
      usernname: string,
      groupname: string
    } 
  } = {};
  
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
    const res = this.userService.joinGroup( groupname, username );
    this.activeClients[client.id] = payload;
    // const res = `Connected ${username} ${groupname}`;
    this.server.emit('joined', res);
  }

  @SubscribeMessage('leave')
  handleExitGroup(client: Socket, payload: any): void {
    const { username, groupname } = payload;
    if (!username || !groupname) throw new Error('Missing data')
    const res = this.userService.leaveGroup({ groupname, username });
    this.activeClients[client.id] = payload;
    this.server.emit('leaved', res);
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.userService.temporaryLeaveGroup(this.activeClients[client.id]);
    delete this.activeClients[client.id];
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('aaa')
  handMessage(client: any, payload : any): void {
    this.server.emit('message');
  }
}
 