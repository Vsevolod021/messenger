import z from 'zod';

export interface CreateChatDto {
  name: string;
  participants: string[];
}

export const ChatSchema = z.object({
  _id: z.string(),
  name: z.string(),
  participants: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Chat = z.infer<typeof ChatSchema>;
export const ChatsSchema = z.array(ChatSchema);
export type Chats = z.infer<typeof ChatsSchema>;
