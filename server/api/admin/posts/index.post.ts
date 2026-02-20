import { PostModel } from '../../../models/Post'
import { ensureDbReady } from '../../../utils/initDb'
import { makeUniqueSlug, toCreationData, validatePostPayload } from '../../../utils/posts'

export default defineEventHandler(async (event) => {
  await ensureDbReady()

  const body = await readBody(event)
  const payload = validatePostPayload(body)
  const slug = await makeUniqueSlug(payload.title)

  const post = await PostModel.create(toCreationData(payload, slug))
  return post.get({ plain: true })
})
