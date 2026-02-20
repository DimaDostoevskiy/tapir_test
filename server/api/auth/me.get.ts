import { getCurrentUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const user = getCurrentUser(event)

  return {
    authenticated: Boolean(user),
    user,
    isAdmin: user?.role === 'ADMIN',
  }
})
