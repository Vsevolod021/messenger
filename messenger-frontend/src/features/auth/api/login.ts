import { axiosApiInstance } from '@/shared/api'

import type { AuthResponseDto, LoginRequestDto } from '../model/types'
import { LOGIN_API } from '../config/apiConstants'

export const login = async (data: LoginRequestDto): Promise<AuthResponseDto> => {
  const response = await axiosApiInstance.post(LOGIN_API, { ...data })
  return response.data
}
