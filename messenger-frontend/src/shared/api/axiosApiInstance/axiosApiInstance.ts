import { BASE_URL } from '@/shared/config'
import { getFromSessionStorage } from '@/shared/utils'
import axios from 'axios'

export const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
})

axiosApiInstance.interceptors.request.use((config) => {
  const token = getFromSessionStorage('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
