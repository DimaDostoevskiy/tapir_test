import type { H3Event } from 'h3'
import { createError, deleteCookie, getCookie, getHeader, setCookie } from 'h3'
import { createSession, destroySession, getStoredSession, type SessionUser } from './sessionStore'

interface WhoAmIResponse {
  id?: string | number
  email?: string
  name?: string
  Role?: string
  role?: string
  [key: string]: unknown
}

function isDevelopmentEnv() {
  const runtimeConfig = useRuntimeConfig()
  const nodeEnv = String(runtimeConfig.nodeEnv || process.env.NODE_ENV || '').toLowerCase()
  return nodeEnv === 'development' || nodeEnv === 'dev'
}

function normalizeRole(role: string | undefined) {
  return String(role || '').trim().toUpperCase()
}

const FALLBACK_ROLE = 'USER'
const ANONYMOUS_USER: SessionUser = {
  name: 'Инкогнито',
  role: FALLBACK_ROLE,
}

function toSessionUser(payload: WhoAmIResponse | null | undefined): SessionUser {
  const safePayload = payload && typeof payload === 'object' ? payload : {}
  const roleValue = normalizeRole(
    (safePayload as WhoAmIResponse).Role || (safePayload as WhoAmIResponse).role,
  ) || FALLBACK_ROLE

  return {
    id: (safePayload as WhoAmIResponse).id,
    email: (safePayload as WhoAmIResponse).email,
    name: (safePayload as WhoAmIResponse).name,
    role: roleValue,
  }
}

function extractAuthorizationToken(event: H3Event) {
  const authorizationHeader = (getHeader(event, 'authorization') || '').trim()
  if (!authorizationHeader) {
    return ''
  }

  const bearerPrefix = 'Bearer '
  if (authorizationHeader.startsWith(bearerPrefix)) {
    return authorizationHeader.slice(bearerPrefix.length).trim()
  }

  return authorizationHeader
}

export async function fetchExternalUserByToken(token: string): Promise<SessionUser> {
  const runtimeConfig = useRuntimeConfig()

  const response = await $fetch<WhoAmIResponse>(runtimeConfig.externalWhoamiUrl, {
    headers: {
      Authorization: token,
    },
  })

  return toSessionUser(response)
}

export function setAuthCookie(event: H3Event, sessionId: string) {
  const runtimeConfig = useRuntimeConfig()

  setCookie(event, runtimeConfig.sessionCookieName, sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: runtimeConfig.sessionTtlSeconds,
  })
}

export function clearAuthCookie(event: H3Event) {
  const runtimeConfig = useRuntimeConfig()
  deleteCookie(event, runtimeConfig.sessionCookieName, { path: '/' })
}

export function createAuthSession(event: H3Event, user: SessionUser) {
  const runtimeConfig = useRuntimeConfig()
  const sessionId = createSession(user, runtimeConfig.sessionTtlSeconds)
  setAuthCookie(event, sessionId)
}

export async function getCurrentUser(event: H3Event): Promise<SessionUser> {
  const runtimeConfig = useRuntimeConfig()
  const token = extractAuthorizationToken(event)
  if (token) {
    try {
      const whoAmIUser = await fetchExternalUserByToken(token)
      createAuthSession(event, whoAmIUser)
      return whoAmIUser
    } catch {
      createAuthSession(event, ANONYMOUS_USER)
      return ANONYMOUS_USER
    }
  }

  const sessionId = getCookie(event, runtimeConfig.sessionCookieName)
  if (!sessionId) {
    createAuthSession(event, ANONYMOUS_USER)
    return ANONYMOUS_USER
  }

  const session = getStoredSession(sessionId)
  if (!session) {
    clearAuthCookie(event)
    createAuthSession(event, ANONYMOUS_USER)
    return ANONYMOUS_USER
  }

  return {
    ...session.user,
    role: normalizeRole(session.user.role) || FALLBACK_ROLE,
  }
}

export function logoutCurrentSession(event: H3Event) {
  const runtimeConfig = useRuntimeConfig()
  const sessionId = getCookie(event, runtimeConfig.sessionCookieName)

  if (sessionId) {
    destroySession(sessionId)
  }

  clearAuthCookie(event)
}

export async function requireAdmin(event: H3Event) {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  if (normalizeRole(user.role) !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Admin role required' })
  }

  return user
}
