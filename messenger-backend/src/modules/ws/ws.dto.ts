import { Socket } from 'socket.io';
import { ClientData } from '../auth/types/jwt-payload.type';

export interface MessageWsSendDto {
  data: { chatId: string; text: string };
  client: Socket<any, any, any, ClientData>;
}
