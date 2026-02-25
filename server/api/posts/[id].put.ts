import {createError, defineEventHandler, getRouterParam, readBody} from 'h3'
import {PostModel} from '../../models/Post'
import {ensureDbReady} from '../../utils/initDb'
import {validatePostPayload} from '../../utils/posts'
import makeSlug from "../../utils/makeSlugUtil";

export default defineEventHandler(async (event) => {
    await ensureDbReady()

    const id = Number(getRouterParam(event, 'id'))
    if (!Number.isInteger(id) || id <= 0) {
        throw createError({statusCode: 400, statusMessage: 'Invalid post id'})
    }

    const post = await PostModel.findByPk(id)
    if (!post) {
        throw createError({statusCode: 404, statusMessage: 'Post not found'})
    }

    const body = await readBody(event)
    const payload = validatePostPayload(body)
    const slug = await makeSlug(payload.title, id)

    await post.update({
        title: payload.title,
        slug,
        excerpt: payload.excerpt || null,
        content: payload.content,
        published: payload.published ?? true,
        image: payload.image || null,
    })

    return post.get({plain: true})
})
