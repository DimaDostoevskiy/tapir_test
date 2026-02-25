import {defineEventHandler, getQuery} from 'h3'
import {PostModel} from '../../models/Post'
import {ensureDbReady} from '../../utils/initDb'
import {Op} from 'sequelize'

export default defineEventHandler(async (event) => {
    await ensureDbReady()

    const limit = Number(getQuery(event).limit) || 1000
    const offset = Number(getQuery(event).offset) || 0
    const searchString = getQuery(event).q || ''

    const where: Record<string | symbol, unknown> = {
        published: true,
    }

    if (searchString) {
        where[Op.or] = [
            {title: {[Op.like]: `%${searchString}%`}},
            {excerpt: {[Op.like]: `%${searchString}%`}},
            {content: {[Op.like]: `%${searchString}%`}},
        ]
    }

    const list = await PostModel.findAll({
        where,
        order: [['createdAt', 'DESC']],
        limit,
        offset,
    })

    return list.map((post) => post.get({plain: true}))
})
