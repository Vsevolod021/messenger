import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientData, JwtPayload, WsAuth } from '../auth/types/jwt-payload.type';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) {}

  handleConnection(client: Socket<any, any, any, ClientData>) {
    try {
      const auth = client.handshake.auth as WsAuth;
      const token = auth?.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify<JwtPayload>(token);

      client.data.user = {
        userId: payload.sub,
        login: payload.login,
      };

      console.log('client connected:', client.data.user);
    } catch {
      console.log('WS auth failed');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnected:', client.id);
  }
}
