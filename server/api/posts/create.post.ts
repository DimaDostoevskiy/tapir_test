import {createError, defineEventHandler, readBody} from 'h3'
import {PostModel} from '../../models/Post'
import makeSlug from '../../utils/makeSlugUtil'
import {validatePostPayload} from '../../utils/posts'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const payload = validatePostPayload(body)

    payload.slug = await makeSlug(payload.title)

    const post = await PostModel.create({...payload})

    if (!post) {
        throw createError({statusCode: 400, statusMessage: 'Ошибка! Не удалось создать пост!'})
    }

    return post.get({plain: true})
})
