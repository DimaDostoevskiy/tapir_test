import {PostModel, PostPayload} from '../../../models/Post'
import makeSlug from '../../../utils/makeSlugUtil'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (data) => {
        if (!data) {
            throw createError({status: 400, message: 'Title required'})
        }
        return data as PostPayload
    })
    body.slug = await makeSlug(body.title)
    const payload = validatePostPayload(body)
    const post = await PostModel.create({...payload})
    return post.get({plain: true})
})
