import { removeFromSessionStorage } from '@/shared/utils'

export const logOut = () => {
  removeFromSessionStorage('accessToken')
}
