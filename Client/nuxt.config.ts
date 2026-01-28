// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages:true,
   runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  }
})
