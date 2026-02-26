import {defineNitroPlugin} from '#imports'
import {initPostModel} from '../models/Post'
import {getSequelize} from '../utils/db'

let initPromise: Promise<void> | null = null

export default defineNitroPlugin(async () => {
    if (!initPromise) {
        initPromise = (async () => {
            const sequelize = getSequelize()
            initPostModel(sequelize)

            await sequelize.authenticate()
            await sequelize.sync(
                {alter: true, force: false}
            )

        })()
    }

    await initPromise
})

