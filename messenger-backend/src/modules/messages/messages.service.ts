import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  createMessage(createMessageDto: CreateMessageDto) {
    return this.messageModel.create(createMessageDto);
  }

  async getMessagesByChatId(chatId: string) {
    return await this.messageModel
      .find({ chatId })
      .populate('authorId', '-password');
  }
}
