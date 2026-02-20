import { Op } from 'sequelize'
import { createError } from 'h3'
import { PostModel, type PostCreationAttributes } from '../models/Post'

export interface PostPayload {
  title: string
  excerpt?: string | null
  content: string
  published?: boolean
}

export function validatePostPayload(input: unknown): PostPayload {
  if (!input || typeof input !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Payload must be an object' })
  }

  const body = input as Record<string, unknown>
  const title = String(body.title || '').trim()
  const excerptRaw = body.excerpt
  const content = String(body.content || '').trim()
  const published = typeof body.published === 'boolean' ? body.published : true

  if (!title) {
    throw createError({ statusCode: 400, statusMessage: 'Title is required' })
  }

  if (title.length > 255) {
    throw createError({ statusCode: 400, statusMessage: 'Title is too long' })
  }

  if (!content) {
    throw createError({ statusCode: 400, statusMessage: 'Content is required' })
  }

  return {
    title,
    excerpt: typeof excerptRaw === 'string' ? excerptRaw.trim() : null,
    content,
    published,
  }
}

export function makeSlug(title: string) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return base || `post-${Date.now()}`
}

export async function makeUniqueSlug(title: string, excludeId?: number) {
  const baseSlug = makeSlug(title)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const conflict = await PostModel.findOne({
      where: {
        slug,
        ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      },
    })

    if (!conflict) {
      return slug
    }

    counter += 1
    slug = `${baseSlug}-${counter}`
  }
}

export function toCreationData(payload: PostPayload, slug: string): PostCreationAttributes {
  return {
    title: payload.title,
    slug,
    excerpt: payload.excerpt || null,
    content: payload.content,
    published: payload.published ?? true,
  }
}
