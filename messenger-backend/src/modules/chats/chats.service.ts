import { Injectable } from '@nestjs/common';
import { AddMessageDto, CreateChatDto } from './chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    return await this.chatModel.create(createChatDto);
  }

  async getChats() {
    return await this.chatModel.find();
  }

  async getChatData(id: string) {
    return await this.chatModel.findById(id).select('-messages');
  }

  async addMessage(addMessageDto: AddMessageDto) {
    return await this.chatModel.findByIdAndUpdate(addMessageDto.chatId, {
      $push: { messages: addMessageDto.messageId },
    });
  }
}
