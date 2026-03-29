import { axiosApiInstance } from '@/shared/api';
import { API_METHODS } from '@/shared/config';

import { ChatsSchema, type Chat } from '../../model/types';
import { chatsApiConstants } from '../../config/apiConstants';

const fetchChatsApiMethod = API_METHODS.GET;

export const fetchChatsApi = (): Promise<Chat[]> => {
  return axiosApiInstance[fetchChatsApiMethod](chatsApiConstants.chats).then((resp) =>
    ChatsSchema.parse(resp.data)
  );
};
