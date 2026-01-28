import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true, // required for Sanctum
    headers: {
      Accept: 'application/json'
    }
  })

  // Request interceptor
  api.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error)
  )

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized')
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: api
    }
  }
})
