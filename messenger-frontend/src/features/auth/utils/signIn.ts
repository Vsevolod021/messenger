import { setToSessionStorage } from '@/shared/utils'

import { login } from '../api/login'
import { useAuthStore } from '../model/auth.store'

export const signIn = async (data: Parameters<typeof login>[0]) => {
  const response = await login(data)

  const authStore = useAuthStore()

  setToSessionStorage('accessToken', response.accessToken)
  authStore.logIn()
}
