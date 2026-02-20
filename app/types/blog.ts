export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface PostFormPayload {
  title: string
  excerpt: string
  content: string
  published: boolean
}
