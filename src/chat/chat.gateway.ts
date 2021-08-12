import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as redis from 'redis';
import * as redisStore from 'socket.io-redis';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private static readonly logger = new Logger(ChatGateway.name);
  private client = redis.createClient({
    host: 'localhost',
    port: 10300,
  });

  @WebSocketServer()
  server: Server;

  afterInit() {
    ChatGateway.logger.debug(`Socket Server Init Complete`);
  }

  handleConnection(client: Socket) {
    ChatGateway.logger.debug(
      `${client.id}(${client.handshake.query['username']}) is connected!`,
    );

    this.server.emit('msgToClient', {
      name: `admin`,
      text: `join chat.`,
    });
  }

  handleDisconnect(client: Socket) {
    ChatGateway.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: { name: string; text: string }): void {
    this.client.hmset('chat', payload.name, payload.text);
    this.client.hgetall('chat', (err, reply) => {
      console.log(reply);
    });
    this.server.emit('msgToClient', payload);
  }
}
