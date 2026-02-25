import {createError, defineEventHandler, readBody} from 'h3'
import {PostModel} from '../../models/Post'
import {ensureDbReady} from '../../utils/initDb'
import makeSlug from '../../utils/makeSlugUtil'
import {validatePostPayload} from '../../utils/posts'

export default defineEventHandler(async (event) => {
    await ensureDbReady()

    const body = await readBody(event)
    const payload = validatePostPayload(body)
    const slug = await makeSlug(payload.title)

    const post = await PostModel.create({
        title: payload.title,
        slug,
        excerpt: payload.excerpt || null,
        content: payload.content,
        published: payload.published ?? true,
        image: payload.image || null,
    })

    if (!post) {
        throw createError({statusCode: 400, statusMessage: 'Ошибка! Не удалось создать пост!'})
    }

    return post.get({plain: true})
})
