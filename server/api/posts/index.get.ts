import { PostModel } from '../../models/Post'
import { ensureDbReady } from '../../utils/initDb'

export default defineEventHandler(async () => {
  await ensureDbReady()

  const posts = await PostModel.findAll({
    where: {
      published: true,
    },
    order: [['createdAt', 'DESC']],
  })

  return posts.map((post) => post.get({ plain: true }))
})
