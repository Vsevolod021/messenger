import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientData, JwtPayload, WsAuth } from '../auth/types/jwt-payload.type';
import { PresenceService } from './presence/presence.service';
import { MessagesWsService } from './services/messages.ws.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly presenceService: PresenceService,
    private readonly messagesWsService: MessagesWsService,
  ) {}

  handleConnection(client: Socket<any, any, any, ClientData>) {
    try {
      const auth = client.handshake.auth as WsAuth;
      const token = auth?.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify<JwtPayload>(token);

      const user = {
        userId: payload.sub,
        login: payload.login,
      };

      client.data.user = user;

      this.presenceService.userConnected(user.userId, client.id);
    } catch {
      console.log('WS Auth failed');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket<any, any, any, ClientData>) {
    const user = client.data.user;

    if (!user) {
      return;
    }

    this.presenceService.userDisconnected(user.userId);
  }

  @SubscribeMessage('message:send')
  async handleMessageSend(
    @MessageBody() data: { chatId: string; text: string },
    @ConnectedSocket() client: Socket<any, any, any, ClientData>,
  ) {
    await this.messagesWsService.handleMessageSend({ data, client });
  }

  /*
  @SubscribeMessage('get:online-users')
  handleGetOnlineUsers() {
    return {
      event: 'online-users',
      data: {
        users: this.presenceService.getOnlineUsers(),
      },
    };
  }

  @SubscribeMessage('join:chat')
  async handleJoinChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket<any, any, any, ClientData>,
  ) {
    await client.join(data.chatId);

    console.log(
      `Client ${client.data.user?.userId} joined chat ${data.chatId}`,
    );

    return {
      event: 'chat:joined',
      data: {
        chatId: data.chatId,
      },
    };
  }

  @SubscribeMessage('leave:chat')
  async handleLeaveChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket<any, any, any, ClientData>,
  ) {
    await client.leave(data.chatId);

    this.server.to(data.chatId).emit('message:chat', {
      message: `User ${client.data.user?.userId} has left the chat.`,
    });

    return {
      event: 'chat:left',
      data: {
        chatId: data.chatId,
      },
    };
  }

  @SubscribeMessage('chat:test')
  handleChatTest(
    @MessageBody() data: { chatId: string; text: string },
    @ConnectedSocket() client: Socket<any, any, any, ClientData>,
  ) {
    console.log(
      `Received test message from ${client.data.user?.userId} to chat ${data.chatId}: ${data.text}`,
    );

    client.to(data.chatId).emit('chat:test:response', {
      from: client.data.user?.login,
      text: data.text,
    });
  }
    */
}
