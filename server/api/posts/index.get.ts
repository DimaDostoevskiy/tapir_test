import {PostModel} from '../../models/Post'
import {ensureDbReady} from '../../utils/initDb'

export default defineEventHandler(async () => {
    await ensureDbReady()

    return await PostModel.findAll({
        where: {
            published: true,
        },
        order: [['createdAt', 'DESC']],
    })
})
