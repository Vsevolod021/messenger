export interface CreateChatDto {
  name: string;
  participants: string[];
}

export interface AddMessageDto {
  chatId: string;
  messageId: string;
}
