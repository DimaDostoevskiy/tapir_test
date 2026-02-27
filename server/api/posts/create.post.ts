import {createError, defineEventHandler, readBody} from 'h3'
import {PostModel} from '../../models/Post'
import makeSlug from '../../utils/makeSlugUtil'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    body.slug = makeSlug(body.title)
    return await PostModel.create(body)
        .then(post => {
            return post.get({plain: true})
        })
        .catch(() => {
            throw createError({
                statusCode: 400,
                statusMessage: 'Ошибка! Не удалось создать пост!',
            })
        })
})
