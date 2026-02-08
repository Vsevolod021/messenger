import { axiosApiInstance } from '@/shared/api'

import { USERS_API } from '../config/apiConstants'
import type { Users } from '../model/types'

export const getAllUsers = async (): Promise<Users> => {
  const response = await axiosApiInstance.get(USERS_API)

  return response.data
}
