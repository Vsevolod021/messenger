import { axiosApiInstance } from '@/shared/api';
import { API_METHODS } from '@/shared/config';

import { AuthResponceDtoSchema, type RegisterDto, type AuthResponseDto } from '../../model/types';
import { authApiConstants } from '../../config/apiConstants';

const registerMethod = API_METHODS.POST;

export const register = (data: RegisterDto): Promise<AuthResponseDto> => {
  return axiosApiInstance[registerMethod](authApiConstants.register, { ...data }).then((resp) =>
    AuthResponceDtoSchema.parse(resp.data)
  );
};
