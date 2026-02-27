import {defineEventHandler, readBody, createError} from 'h3'
import {useRuntimeConfig} from '#imports'

interface GeneratePostBody {
    promptTheme?: string
}

export default defineEventHandler(async (event) => {
    const {promptTheme} = await readBody<GeneratePostBody>(event)

    const theme = (promptTheme || '').trim()
    if (!theme) {
        throw createError({statusCode: 400, statusMessage: 'Missing prompt theme'})
    }

    const config = useRuntimeConfig()
    const apiKey = (config.githubModelsApiKey as string)
    if (!apiKey) {
        throw createError({statusCode: 500, statusMessage: 'Missing GitHub models API key'})
    }

    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'DeepSeek-R1',
            messages: [
                {
                    role: 'system',
                    content:
                        'Ты помощник, который генерирует посты для блога. Отвечай ТОЛЬКО чистым JSON без markdown, без объяснений, без ```json тегов.',
                },
                {
                    role: 'user',
                    content: `Сгенерируй пост на тему ${theme}. Верни ТОЛЬКО JSON: {title: '',content: '', description: ''}`,
                },
            ],
        }),
    })

    if (!response.ok) {
        const text = await response.text()
        throw createError({
            statusCode: 502,
            statusMessage: 'Upstream AI service error',
            data: text,
        })
    }

    return await response.json()
})

