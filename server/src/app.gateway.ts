import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UserService } from './user/user.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService
  ) { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private activeClients: {
    [clientId: string]: {
      usernname: string,
      groupname: string
    }
  } = {};

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    console.log(payload);
    const { username, message, groupname } = payload;
    if (!username || !message || !groupname) throw new Error('Missing data')
    const res = await this.userService.sendMessage({ groupname, username, message });
    // console.log(res);
    this.server.emit('msgToClient', res);
  }

  @SubscribeMessage('join')
  async handleJoinGroup(client: Socket, payload: any): Promise<void> {
    const { username, groupname } = payload;
    if (!username || !groupname) throw new Error('Missing data')
    const res = await this.userService.joinGroup({ groupname, username });
    this.activeClients[client.id] = payload;

    // console.log('join active: ', this.activeClients);
    // const res = `Connected ${username} ${groupname}`;
    this.server.emit('joined', res);
  }

  @SubscribeMessage('leave')
  handleLeaveGroup(client: Socket, payload: any): void {
    const { username, groupname } = payload;
    if (!username || !groupname) throw new Error('Missing data')
    const res = this.userService.leaveGroup({ groupname, username });
    delete this.activeClients[client.id];
    this.server.emit('leaved', res);
  }

  @SubscribeMessage('test')
  handleTest(client: Socket, payload: any): void {
    const res = payload;
    this.server.emit('test success', res);
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // console.log('active:', this.activeClients[client.id]);
    this.userService.temporaryLeaveGroup(this.activeClients[client.id]);
    delete this.activeClients[client.id];
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
}
