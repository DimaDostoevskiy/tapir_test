import {createError} from 'h3'
import {PostPayload} from '../models/Post'

export function validatePostPayload(payload: unknown): PostPayload {
    if (!payload || typeof payload !== 'object') {
        throw createError({statusCode: 400, statusMessage: 'Payload must be an object'})
    }

    const body = payload as PostPayload
    const result: any = {}
    result.title = String(body.title ?? '').trim()
    result.excerpt = String(body.excerpt)
    result.content = String(body.content ?? '').trim()
    result.published = typeof body.published === 'boolean' ? body.published : true
    result.slug = String(body.slug ?? '').trim()
    result.image = String(body.image).trim() || null

    if (!result.title) {
        throw createError({statusCode: 400, statusMessage: 'Title is required'})
    }

    if (result.title.length > 255) {
        throw createError({statusCode: 400, statusMessage: 'Title is too long'})
    }

    if (!result.content) {
        throw createError({statusCode: 400, statusMessage: 'Content is required'})
    }

    if (body.id) {
        result.id = body.id
    }

    return result as PostPayload
}

