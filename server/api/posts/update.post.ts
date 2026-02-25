import { defineEventHandler, readBody } from 'h3'
import { PostModel } from '../../models/Post'
import makeSlug from '../../utils/makeSlugUtil'
import { validatePostPayload } from '../../utils/posts'

export default defineEventHandler(async (event) => {
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

    return post.get({plain: true})
})
