import { createError, getRouterParam } from 'h3'
import { PostModel } from '../../../models/Post'
import { requireAdmin } from '../../../utils/auth'
import { ensureDbReady } from '../../../utils/initDb'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await ensureDbReady()

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' })
  }

  const post = await PostModel.findByPk(id)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  return post.get({ plain: true })
})
