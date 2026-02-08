import { BASE_URL } from '@/shared/config'
import axios from 'axios'

export const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
})
