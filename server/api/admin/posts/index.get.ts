import { PostModel } from '../../../models/Post'
import { requireAdmin } from '../../../utils/auth'
import { ensureDbReady } from '../../../utils/initDb'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await ensureDbReady()

  const posts = await PostModel.findAll({
    order: [['createdAt', 'DESC']],
  })

  return posts.map((post) => post.get({ plain: true }))
})
