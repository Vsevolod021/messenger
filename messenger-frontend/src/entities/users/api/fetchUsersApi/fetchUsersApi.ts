import { axiosApiInstance } from '@/shared/api';
import { API_METHODS } from '@/shared/config';

import { UsersApiConstants } from '../../config/apiConstants';
import { UsersSchema, type Users } from '../../model/types';

const fetchUsersApiMethod = API_METHODS.GET;

export const fetchUsersApi = (): Promise<Users> => {
  return axiosApiInstance[fetchUsersApiMethod](UsersApiConstants.users).then((resp) =>
    UsersSchema.parse(resp.data)
  );
};
