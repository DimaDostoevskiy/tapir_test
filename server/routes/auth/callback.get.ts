import { getQuery, sendRedirect } from 'h3'
import { createAuthSession, fetchExternalUserByToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = typeof query.token === 'string' ? query.token.trim() : ''

  if (!token) {
    return sendRedirect(event, '/blog?auth=missing-token', 302)
  }

  try {
    const user = await fetchExternalUserByToken(token)

    if (user.role !== 'ADMIN') {
      return sendRedirect(event, '/blog?auth=forbidden', 302)
    }

    createAuthSession(event, user)
    return sendRedirect(event, '/admin/blog', 302)
  } catch {
    return sendRedirect(event, '/blog?auth=failed', 302)
  }
})
