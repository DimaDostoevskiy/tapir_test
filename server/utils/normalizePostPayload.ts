import {z, ZodError} from 'zod'
import {createError} from 'h3'
import {PostModel} from "../models/Post";
import makeSlug from "./makeSlugUtil";

const PostSchema = z.object({
    id: z.number().optional(),
    title: z.string()
        .min(1, 'Title is required')
        .max(255, 'Title must be less than 255 characters'),
    description: z.string()
        .optional()
        .default(''),
    content: z.string()
        .min(1, 'Content is required'),
    published: z.boolean()
        .default(true),
    slug: z.string()
        .min(1, 'Slug is required')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    image: z.string()
        .refine((val) => {
            try {
                new URL(val);
                return true;
            } catch {
                return false;
            }
        }, {message: 'Invalid image URL'})
        .nullable()
        .optional()
        .default(null),
})

export default function (payload: any, isCreate: boolean = false): PostModel {

    if (payload.title && typeof payload.title === 'string') {
        payload.slug = makeSlug(payload.title)
    }

    if (!isCreate) {
        const idSchema = z.object({id: z.number()})
        const idCheck = idSchema.safeParse(payload)

        if (!idCheck.success) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID is required for update'
            })
        }
    }

    // Валидация всех полей
    const result = PostSchema.safeParse(payload)

    if (!result.success) {
        // const error = result.error as ZodError
        throw createError({
            statusCode: 400,
            statusMessage: 'Ошибка валидации'
        })
    }

    return result.data as PostModel
}
