import {PostModel} from "../models/Post";
import {Op} from "sequelize";

export default async function makeSlug(title: string, excludeId?: number): Promise<string> {
    const base = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    const baseSlug = base || `post-${Date.now()}`
    let slug = baseSlug
    let counter = 1

    while (true) {
        const conflict = await PostModel.findOne({
            where: {
                slug,
                ...(excludeId ? {id: {[Op.ne]: excludeId}} : {}),
            },
        })

        if (!conflict) {
            return slug
        }

        counter += 1
        slug = `${baseSlug}-${counter}`
    }
}
