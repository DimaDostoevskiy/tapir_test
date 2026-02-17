export type Product = {
  id: number
  name: string
  price: number
  image: string
}

export type ProductsResponse = {
  total: number
  totalPages: number
  currentPage: number
  limit: number
  products: Product[]
}

