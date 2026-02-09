import router from '@/app/router'
import { getMyUser } from '@/entities/user'
import { getFromSessionStorage, removeFromSessionStorage } from '@/shared/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type AuthStatus = 'unknown' | 'authorized' | 'unauthorized'

// FixMe, auth store should be initialized before router, otherwise we have to check auth status in every page
export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>('unknown')

  async function init() {
    const token = getFromSessionStorage('accessToken')

    if (!token) {
      authStatus.value = 'unauthorized'
      router.push('/login')
      return
    }

    try {
      await getMyUser()

      authStatus.value = 'authorized'
      router.push('/chats')
    } catch {
      logOut()
    }
  }

  async function logOut() {
    removeFromSessionStorage('accessToken')
    authStatus.value = 'unauthorized'
    router.push('/login')
  }

  return {
    authStatus,
    init,
    logOut,
  }
})
