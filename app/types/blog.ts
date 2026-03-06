export interface BlogPost {
    id: number
    title: string
    slug: string
    description: string | null
    content: string
    published: boolean
    image?: string | null
    createdAt: string
    updatedAt: string
}

export interface IPostFormPayload {
    id: number | undefined
    title: string
    description: string
    content: string
    published: boolean
    slug: string
    image?: string | null
}
