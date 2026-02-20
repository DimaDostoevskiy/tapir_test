import { defineEventHandler, getQuery, sendRedirect } from 'h3'
import { createAuthSession, fetchExternalUserByToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = typeof query.token === 'string' ? query.token.trim() : ''

  if (!token) {
    createAuthSession(event, {
      name: 'Инкогнито',
      role: 'USER',
    })
    return sendRedirect(event, '/', 302)
  }

  try {
    const user = await fetchExternalUserByToken(token)
    createAuthSession(event, user)
    return sendRedirect(event, user.role === 'ADMIN' ? '/admin' : '/', 302)
  } catch {
    createAuthSession(event, {
      name: 'Инкогнито',
      role: 'USER',
    })
    return sendRedirect(event, '/', 302)
  }
})
