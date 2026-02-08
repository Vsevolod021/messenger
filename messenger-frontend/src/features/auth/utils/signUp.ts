import { setToSessionStorage } from '@/shared/utils'

import { register } from '../api/register'

export const signUp = async (data: Parameters<typeof register>[0]) => {
  const response = await register(data)

  setToSessionStorage('accessToken', JSON.stringify(`Bearer ${response.accessToken}`))
}
