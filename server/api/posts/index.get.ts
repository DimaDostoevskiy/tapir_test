import {PostModel} from '../../models/Post'
import {ensureDbReady} from '../../utils/initDb'
import {getQuery} from 'h3'
import {normalizePositiveInt} from '../../utils/normalizePositiveInt'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

export default defineEventHandler(async (event) => {
    await ensureDbReady()

    const query = getQuery(event)
    const limit = Math.min(normalizePositiveInt(query.limit, DEFAULT_LIMIT), MAX_LIMIT)
    const offset = normalizePositiveInt(query.offset, 0)

    return await PostModel.findAll({
        where: {
            published: true,
        },
        order: [['createdAt', 'DESC']],
        limit,
        offset,
    })
})
