import { createError, defineEventHandler, getRouterParam } from 'h3'
import { PostModel } from '../../models/Post'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' })
  }

  const deletedCount = await PostModel.destroy({ where: { id } })

  if (deletedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  return { ok: true }
})
