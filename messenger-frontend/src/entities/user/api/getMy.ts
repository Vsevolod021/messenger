import { axiosApiInstance } from '@/shared/api'

import { USERS_MY_API } from '../config/apiConstants'
import type { User } from '../model/types'

export const getMyUser = async (): Promise<User> => {
  const response = await axiosApiInstance.get(USERS_MY_API)
  return response.data
}
