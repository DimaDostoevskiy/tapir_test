import { initPostModel } from '../models/Post'
import { getSequelize } from './db'

let initPromise: Promise<void> | null = null

export async function ensureDbReady() {
  if (!initPromise) {
    initPromise = (async () => {
      const sequelize = getSequelize()
      initPostModel(sequelize)
      await sequelize.authenticate()
      await sequelize.sync()
    })()
  }

  await initPromise
}
