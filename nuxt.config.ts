export default defineNuxtConfig({
    devtools: {enabled: false},

    typescript: {
        typeCheck: false,
    },

    compatibilityDate: '2026-01-01',

    css: ['~/assets/styles/main.css'],

    app: {
        baseURL: '/blog/',
        head: {
            title: 'Pro Moto Blog',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'description', content: 'Блог про мотобизнес в России'}
            ]
        }
    },

    runtimeConfig: {
        githubModelsApiKey: process.env.GITHUB_MODELS_API_KEY || '',
        nodeEnv: process.env.NODE_ENV || 'development',
        host: process.env.HOST || '127.0.0.1',
        port: Number(process.env.PORT) || 3000,
        mailKey: process.env.MAIL_KEY || 'key',
        filesBaseUrl: process.env.FILES_BASE_URL || '',
        externalAuthUrl: process.env.EXTERNAL_AUTH_URL || 'http://127.0.0.1:8000/api/auth/',
        mysql: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: Number(process.env.DB_PORT || 3306),
            database: process.env.DB_NAME || 'tapir_blog',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '12345678',
        },
    },

    nitro: {
        storage: {
            uploads: {
                driver: 'fs',
                base: process.env.UPLOAD_DIR || './uploads',
            },
        },
        routeRules: {
            '/api/**': {
                cors: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            },

            // Публичные посты - кэш на 1 час
            '/blog/**': {
                ssr: true,
                cache: {
                    maxAge: 3600
                }
            },

            // Админка SPA без кэша
            '/admin/**': {
                ssr: false,
                cache: false
            }
        },

        // Настройки для production
        preset: 'node-server', // или 'vercel', 'cloudflare', и т.д.

        // Компрессия
        compressPublicAssets: true,
    }
})
