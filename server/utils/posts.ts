import {createError} from 'h3'

export interface PostPayload {
    title: string
    slug: string
    excerpt: string | null
    content: string
    published: boolean
    image: string | null
}

export function validatePostPayload(payload: unknown): PostPayload {
    if (!payload || typeof payload !== 'object') {
        throw createError({statusCode: 400, statusMessage: 'Payload must be an object'})
    }

    const body = payload as Record<string, unknown>
    const title = String(body.title ?? '').trim()
    const excerpt = body.excerpt != null ? String(body.excerpt) : null
    const content = String(body.content ?? '').trim()
    const published = typeof body.published === 'boolean' ? body.published : true
    const slug = String(body.slug ?? '').trim()
    const image = body.image != null ? String(body.image).trim() || null : null

    if (!title) {
        throw createError({statusCode: 400, statusMessage: 'Title is required'})
    }

    if (title.length > 255) {
        throw createError({statusCode: 400, statusMessage: 'Title is too long'})
    }

    if (!content) {
        throw createError({statusCode: 400, statusMessage: 'Content is required'})
    }

    return {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        published,
        image,
    }
}

