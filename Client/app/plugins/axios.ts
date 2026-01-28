import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  })

  // 🔐 Global error handling
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        navigateTo('/login')
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: { api }
  }
})
