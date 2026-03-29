import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchChatsApi } from './fetchChatsApi/fetchChatsApi';
import { fetchMyChatsApi } from './fetchMyChatsApi/fetchMyChatsApi';
import { createChatApi } from './createChatApi/createChatApi';
import { queryClient } from '@/shared/config';

export const chatsQueries = {
  _def: ['chats'],
  chats: () => ({
    queryKey: [...chatsQueries._def, 'chats'],
    queryFn: () => fetchChatsApi()
  }),
  my: () => ({
    queryKey: [...chatsQueries._def, 'my'],
    queryFn: () => fetchMyChatsApi()
  })
};

export const useChatsQuery = () => {
  return useQuery(chatsQueries.chats());
};

export const useMyChatsQuery = () => {
  return useQuery(chatsQueries.my());
};

// FixMe. Сделать на бэке, чтобы не возвращал созданный чат
export const useCreateChatMutation = () => {
  return useMutation({
    mutationFn: (body: Parameters<typeof createChatApi>[0]) => createChatApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatsQueries._def });
    }
  });
};
