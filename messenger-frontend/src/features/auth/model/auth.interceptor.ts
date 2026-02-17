import { axiosApiInstance } from '@/shared/api'
import { useAuthStore } from './auth.store'

export function setupAuthInterceptor(onUnauthorized: () => void) {
  axiosApiInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        const authStore = useAuthStore()
        authStore.logOut()

        onUnauthorized()
      }
      return Promise.reject(err)
    },
  )
}
