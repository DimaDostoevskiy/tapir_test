// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],

  app: {
    head: {
      title: 'Tapir — тестовое задание',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 4 + TypeScript тестовое задание' }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use \"@/assets/styles/variables.scss\" as *;\\n'
        }
      }
    }
  },

  modules: ['@nuxt/eslint']
})