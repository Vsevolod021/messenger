import { axiosApiInstance } from '@/shared/api';
import { API_METHODS } from '@/shared/config';

import { UsersApiConstants } from '../../config/apiConstants';
import { UserSchema, type User } from '../../model/types';

const fetchMyUserApiMethod = API_METHODS.GET;

export const fetchMyUserApi = (): Promise<User> => {
  return axiosApiInstance[fetchMyUserApiMethod](UsersApiConstants.usersMy).then((resp) =>
    UserSchema.parse(resp.data)
  );
};
