import { axiosApiInstance } from '@/shared/api'
import { useAuthStore } from './auth.store'

export function setupAuthEffects() {
  axiosApiInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        const authStore = useAuthStore()
        authStore.logOut()
      }
      return Promise.reject(err)
    },
  )
}
