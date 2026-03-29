import { axiosApiInstance } from '@/shared/api';

import { chatsApiConstants } from '../../config/apiConstants';
import type { CreateChatDto } from '../../model/types';

export const createChatApi = async (body: CreateChatDto) => {
  const response = await axiosApiInstance.post(chatsApiConstants.createChat, body);

  return response.data;
};
