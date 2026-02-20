export interface AuthUser {
  id?: string | number
  email?: string
  name?: string
  role: string
}

export interface AuthMeResponse {
  authenticated: boolean
  user: AuthUser | null
  isAdmin: boolean
}
