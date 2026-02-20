// https://nuxt.com/docs/api/configuration/nuxt-config
const nodeEnv = String(process.env.NODE_ENV || 'development').toLowerCase()
const isDevEnv = nodeEnv === 'development' || nodeEnv === 'dev'
const defaultExternalApiBaseUrl = isDevEnv ? 'http://localhost:45874/api' : 'http://localhost:7000/api'

export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    typeCheck: false,
  },

  compatibilityDate: '2025-07-15',
  css: ['~/assets/styles/main.scss'],
 

  app: {
    baseURL: '/blog/',
    head: {
      title: 'Pro Moto Blog',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 4 blog with public pages and admin panel' }
      ]
    }
  },

  runtimeConfig: {
    nodeEnv: process.env.NODE_ENV || 'development',
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 3000),
    mailKey: process.env.MAIL_KEY || '',
    sessionSecret: process.env.SESSION_SECRET || 'dev-change-me',
    sessionCookieName: process.env.SESSION_COOKIE_NAME || 'tapir_session',
    sessionTtlSeconds: Number(process.env.SESSION_TTL_SECONDS || 60 * 60 * 8),
    externalApiBaseUrl: process.env.EXTERNAL_API_BASE_URL || defaultExternalApiBaseUrl,
    externalWhoamiUrl: process.env.EXTERNAL_WHOAMI_URL || `${defaultExternalApiBaseUrl}/auth/whoami`,
    mysql: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME || 'tapir_blog',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    },
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
