import { getFromSessionStorage } from '@/shared/utils'
import { getMyUser } from '@/entities/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type AuthStatus = 'unknown' | 'authorized' | 'unauthorized'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>('unknown')

  async function init() {
    try {
      const token = getFromSessionStorage('accessToken')

      if (!token) {
        authStatus.value = 'unauthorized'
        throw new Error()
      }

      await getMyUser()
      authStatus.value = 'authorized'
    } catch {
      logOut()
    }
  }

  async function signIn() {
    authStatus.value = 'authorized'
  }

  async function logOut() {
    authStatus.value = 'unauthorized'
  }

  return {
    authStatus,
    init,
    logOut,
    logIn: signIn,
  }
})
