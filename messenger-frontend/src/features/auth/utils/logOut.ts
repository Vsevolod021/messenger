import { removeFromSessionStorage } from '@/shared/utils'
import { useAuthStore } from '../model/auth.store'

export const logOut = () => {
  const authStore = useAuthStore()

  removeFromSessionStorage('accessToken')
  authStore.logOut()
}
