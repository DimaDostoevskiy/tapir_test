import {createError, defineEventHandler, readBody} from 'h3'
import {PostModel} from '../../models/Post'
import {validatePostPayload} from '../../utils/posts'
import makeSlug from "../../utils/makeSlugUtil"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const payload = validatePostPayload(body)

    // Проверяем наличие ID для обновления
    if (!payload.id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID поста обязателен для обновления'
        })
    }

    payload.slug = await makeSlug(payload.title)

    const [updatedCount, updatedPosts] = await PostModel.update(
        {           // что обновляем
            title: payload.title,
            slug: payload.slug,
            excerpt: payload.excerpt,
            content: payload.content,
            published: payload.published,
            image: payload.image
        },
        {           // условия
            where: {id: payload.id},
            returning: true  // вернуть обновленные записи
        }
    )

    if (updatedCount === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Пост не найден'
        })
    }

    return {
        success: true,
        message: 'Пост успешно обновлён!'
    }
})
