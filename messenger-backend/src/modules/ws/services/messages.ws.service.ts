import { Injectable } from '@nestjs/common';
import { ChatsService } from 'src/modules/chats/chats.service';
import { MessagesService } from 'src/modules/messages/messages.service';
import { MessageWsSendDto } from '../ws.dto';

@Injectable()
export class MessagesWsService {
  constructor(
    private messagesService: MessagesService,
    private chatsService: ChatsService,
  ) {}

  async handleMessageSend(messageWsSendDto: MessageWsSendDto) {
    const { data, client } = messageWsSendDto;

    if (!client.data.user?.userId) {
      return;
    }

    const message = await this.messagesService.createMessage({
      text: data.text,
      authorId: client.data.user?.userId,
    });

    await this.chatsService.addMessage({
      chatId: data.chatId,
      messageId: message._id.toString(),
    });

    client.to(data.chatId).emit('message:new', {
      id: message._id,
      chatId: data.chatId,
      text: message.text,
      authorId: message.authorId,
      createdAt: message.createdAt,
    });
  }
}
