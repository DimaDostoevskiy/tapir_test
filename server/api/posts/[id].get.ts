import {createError, defineEventHandler, getRouterParam} from 'h3'
import {PostModel} from '../../models/Post'

export default defineEventHandler(async (event) => {
    const param = getRouterParam(event, 'id')

    const where: Record<string | symbol, unknown> = {
        published: true,
    }

    if (Number.isInteger(Number(param))) {
        where.id = Number(param)
    } else {
        where.slug = param
    }
    const post = await PostModel.findOne({
        where
    })

    if (!post) {
        throw createError({statusCode: 400, statusMessage: 'Post not found'})
    }

    return post.get({plain: true})
})
