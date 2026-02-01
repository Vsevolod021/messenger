import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { PresenceService } from './presence/presence.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../auth/constants/jwt.constants';
import { ChatsModule } from '../chats/chats.module';
import { MessagesModule } from '../messages/messages.module';
import { MessagesWsService } from './services/messages.ws.service';

@Module({
  imports: [
    ChatsModule,
    MessagesModule,
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [WsGateway, PresenceService, MessagesWsService],
})
export class WsModule {}
