export interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string | null
    content: string
    published: boolean
    image?: string | null
    createdAt: string
    updatedAt: string
}

export interface IPostFormPayload {
    id: number | undefined
    title: string
    excerpt: string
    content: string
    published: boolean
    slug: string
    image?: string | null
}
