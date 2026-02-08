import { axiosApiInstance } from '@/shared/api'

import type { AuthResponseDto, RegisterRequestDto } from '../model/types'
import { REGISTER_API } from '../config/apiConstants'

export const register = async (data: RegisterRequestDto): Promise<AuthResponseDto> => {
  const response = await axiosApiInstance.post(REGISTER_API, { ...data })
  return response.data
}
