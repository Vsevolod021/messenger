import { axiosApiInstance } from '@/shared/api';
import { API_METHODS } from '@/shared/config';

import { AuthResponceDtoSchema, type LoginDto, type AuthResponseDto } from '../../model/types';
import { authApiConstants } from '../../config/apiConstants';

const loginMethod = API_METHODS.POST;

export const login = (data: LoginDto): Promise<AuthResponseDto> => {
  return axiosApiInstance[loginMethod](authApiConstants.login, { ...data }).then((resp) =>
    AuthResponceDtoSchema.parse(resp.data)
  );
};
