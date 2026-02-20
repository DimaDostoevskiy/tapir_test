import { createError, getRouterParam } from 'h3'
import { PostModel } from '../../../models/Post'
import { requireAdmin } from '../../../utils/auth'
import { ensureDbReady } from '../../../utils/initDb'
import { makeUniqueSlug, validatePostPayload } from '../../../utils/posts'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  await ensureDbReady()

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' })
  }

  const post = await PostModel.findByPk(id)
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const body = await readBody(event)
  const payload = validatePostPayload(body)
  const slug = await makeUniqueSlug(payload.title, id)

  await post.update({
    title: payload.title,
    slug,
    excerpt: payload.excerpt || null,
    content: payload.content,
    published: payload.published ?? true,
  })

  return post.get({ plain: true })
})
