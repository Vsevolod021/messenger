import { axiosApiInstance } from '@/shared/api';
import { API_METHODS } from '@/shared/config';

import { chatsApiConstants } from '../../config/apiConstants';
import { ChatsSchema, type Chat } from '../../model/types';

const fetchMyChatsApiMethod = API_METHODS.GET;

export const fetchMyChatsApi = (): Promise<Chat[]> => {
  return axiosApiInstance[fetchMyChatsApiMethod](chatsApiConstants.myChats).then((resp) =>
    ChatsSchema.parse(resp.data)
  );
};
