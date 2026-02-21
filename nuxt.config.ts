export default defineNuxtConfig({
    devtools: {enabled: false},
    typescript: {
        typeCheck: false,
    },

    compatibilityDate: '2025-07-15',
    css: ['~/assets/styles/main.css'],


    app: {
        baseURL: '/blog/',
        head: {
            title: 'Pro Moto Blog',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'description', content: 'Nuxt 4 blog with public pages and admin panel'}
            ]
        }
    },

    runtimeConfig: {
        nodeEnv: process.env.NODE_ENV || 'development',
        host: process.env.HOST || '127.0.0.1',
        port: Number(process.env.PORT || 3000),
        mailKey: process.env.MAIL_KEY || '',
        externalAuthUrl: process.env.EXTERNAL_AUTH_URL || 'http://127.0.0.1:8000/api/auth/',
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
                    additionalData: '@use "@/assets/styles/variables.scss" as *;\\n'
                }
            }
        }
    },

    modules: ['@nuxt/eslint']
})
