import { PostModel } from '../../models/Post'
import { ensureDbReady } from '../../utils/initDb'

export default defineEventHandler(async () => {
  await ensureDbReady()

  const batchId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const now = new Date()

  const payload = Array.from({ length: 500 }, (_, index) => {
    const number = index + 1
    return {
      title: `Mock post ${batchId}-${number}`,
      slug: `mock-post-${batchId}-${number}`,
      excerpt: `Generated mock post ${number}`,
      content: `Auto-generated post #${number} for batch ${batchId}.`,
      published: true,
      createdAt: now,
      updatedAt: now,
    }
  })

  await PostModel.bulkCreate(payload)

  return {
    ok: true,
    created: payload.length,
    batchId,
  }
})
