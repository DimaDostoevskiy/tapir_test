import { defineNitroPlugin } from '#imports'
import { ensureDbReady } from '../utils/initDb'

export default defineNitroPlugin(async () => {
  await ensureDbReady()
})
