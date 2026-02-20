import { PostModel } from '../../../models/Post'
import { ensureDbReady } from '../../../utils/initDb'

export default defineEventHandler(async (event) => {
  await ensureDbReady()

  const posts = await PostModel.findAll({
    order: [['createdAt', 'DESC']],
  })

  return posts.map((post) => post.get({ plain: true }))
})
