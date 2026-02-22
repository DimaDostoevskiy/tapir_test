import {PostModel} from '../../models/Post'
import {ensureDbReady} from '../../utils/initDb'
import {getQuery} from 'h3'
import {normalizePositiveInt} from '../../utils/normalizePositiveInt'
import {Op} from 'sequelize'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

export default defineEventHandler(async (event) => {
    await ensureDbReady()

    const query = getQuery(event)
    const limit = Math.min(normalizePositiveInt(query.limit, DEFAULT_LIMIT), MAX_LIMIT)
    const offset = normalizePositiveInt(query.offset, 0)
    const q = typeof query.q === 'string' ? query.q.trim() : ''

    const where: Record<string | symbol, unknown> = {
        published: true,
    }

    if (q) {
        where[Op.or] = [
            {title: {[Op.like]: `%${q}%`}},
            {excerpt: {[Op.like]: `%${q}%`}},
            {content: {[Op.like]: `%${q}%`}},
        ]
    }

    return await PostModel.findAll({
        where,
        order: [['createdAt', 'DESC']],
        limit,
        offset,
    })
})
