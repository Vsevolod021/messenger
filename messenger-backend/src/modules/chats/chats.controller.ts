import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import type { CreateChatDto } from './chat.dto';
import { MessagesService } from '../messages/messages.service';

@Controller('chats')
export class ChatsController {
  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService,
  ) {}

  @Post('create')
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @Get()
  getChats() {
    return this.chatsService.getChats();
  }

  @Get(':id')
  getChatData(@Param('id') id: string) {
    return this.chatsService.getChatData(id);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.messagesService.getMessagesByChatId(id);
  }
}
