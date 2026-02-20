import { getCurrentUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)

  return {
    authenticated: Boolean(user),
    user,
    isAdmin: user?.role === 'ADMIN',
  }
})
