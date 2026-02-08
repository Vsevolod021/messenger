import { setToSessionStorage } from '@/shared/utils'

import { login } from '../api/login'

export const signIn = async (data: Parameters<typeof login>[0]) => {
  const response = await login(data)

  setToSessionStorage('accessToken', JSON.stringify(`Bearer ${response.accessToken}`))
}
