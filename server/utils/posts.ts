import {createError} from 'h3'
import {PostPayload} from '../models/Post'

export function validatePostPayload(payload: PostPayload): PostPayload {
    if (!payload || typeof payload !== 'object') {
        throw createError({statusCode: 400, statusMessage: 'Payload must be an object'})
    }

    const body = payload as PostPayload
    const title = String(body.title || '').trim()
    const excerpt = body.excerpt
    const content = String(body.content || '').trim()
    const published = typeof body.published === 'boolean' ? !!body.published : false
    const slug = body.slug || ''

    if (!title) {
        throw createError({statusCode: 400, statusMessage: 'Title is required'})
    }

    if (title.length > 255) {
        throw createError({statusCode: 400, statusMessage: 'Title is too long'})
    }

    if (!content) {
        throw createError({statusCode: 400, statusMessage: 'Content is required'})
    }

    return new PostPayload({
        title,
        slug,
        excerpt,
        content,
        published,
    })
}

