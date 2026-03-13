import {createError} from 'h3'
import {Op} from 'sequelize'
import {PostModel} from '../models/Post'
import normalizePostPayload from '../utils/normalizePostPayload'

export interface IListPostsParams {
    limit?: number
    offset?: number
    q?: string
}

const DEFAULT_LIMIT = 10

export const postsService = {
    createPost: async (payload: unknown) => await PostModel.create(normalizePostPayload(payload, true))
        .then(post => post.get({plain: true}))
        .catch(() => {
            throw createError({
                statusCode: 400,
                statusMessage: 'Ошибка! Не удалось создать пост!',
            })
        })
    ,

    searchPost: async (params: IListPostsParams, role: string = '') => {
        const limit = Number(params.limit) || DEFAULT_LIMIT
        const offset = Number(params.offset) || 0
        const searchString = (params.q ?? '').toString().trim().replace(/[%_\\]/g, '\\$&')
        const publishedWhere = role === 'ADMIN' ? {} : {published: true}

        if (!searchString) {
            return PostModel.findAll({
                where: publishedWhere,
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            }).then((list) => list.map((p) => p.get({plain: true})))
        }

        const likePattern = `%${searchString}%`
        return PostModel.findAll({
            where: {
                [Op.and]: [
                    publishedWhere,
                    {
                        [Op.or]: [
                            {title: {[Op.like]: likePattern}},
                            {description: {[Op.like]: likePattern}},
                            {content: {[Op.like]: likePattern}},
                        ],
                    },
                ],
            },
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        }).then((list) => list.map((p) => p.get({plain: true})))
    }
    ,

    getOnePost: async (idOrSlug: string | number) => {
        const where: Record<string, unknown> = {
            published: true
        }
        if (Number.isInteger(Number(idOrSlug))) {
            where.id = Number(idOrSlug)
        } else {
            where.slug = idOrSlug
        }
        const post = await PostModel.findOne({where})
        if (!post) {
            throw createError({statusCode: 404, statusMessage: 'Post not found'})
        }
        return post.get({plain: true})
    }
    ,

    updatePost: async (reqPayload: unknown) => {
        const payload = normalizePostPayload(reqPayload)
        const [updatedCount] = await PostModel.update(payload, {where: {id: payload.id}})

        if (updatedCount === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Пост не найден',
            })
        }
        return {success: true, message: 'Пост успешно изменен!'}
    }
    ,

    removePost: async (id: number) => {
        if (!Number.isInteger(id) || (id < 0)) {
            throw createError({statusCode: 400, statusMessage: 'Invalid post id'})
        }

        const deletedCount = await PostModel.destroy({where: {id}})

        if (deletedCount === 0) {
            throw createError({statusCode: 404, statusMessage: 'Post not found'})
        }

        return {success: true, message: 'Пост успешно удалён!'}
    }
    ,
}
