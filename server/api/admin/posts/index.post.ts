import { PostModel } from '../../../models/Post'
import { requireAdmin } from '../../../utils/auth'
import { ensureDbReady } from '../../../utils/initDb'
import { makeUniqueSlug, toCreationData, validatePostPayload } from '../../../utils/posts'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  await ensureDbReady()

  const body = await readBody(event)
  const payload = validatePostPayload(body)
  const slug = await makeUniqueSlug(payload.title)

  const post = await PostModel.create(toCreationData(payload, slug))
  return post.get({ plain: true })
})
