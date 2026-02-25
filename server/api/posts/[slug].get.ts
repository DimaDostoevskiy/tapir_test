import { createError, defineEventHandler, getRouterParam } from 'h3'
import { PostModel } from '../../models/Post'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const post = await PostModel.findOne({
    where: {
      slug,
      published: true,
    },
  })

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  return post.get({ plain: true })
})
