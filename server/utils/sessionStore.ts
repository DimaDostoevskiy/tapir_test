import { randomUUID } from 'node:crypto'

export interface SessionUser {
  id?: string | number
  email?: string
  name?: string
  role: string
}

interface StoredSession {
  user: SessionUser
  expiresAt: number
}

const sessions = new Map<string, StoredSession>()

export function createSession(user: SessionUser, ttlSeconds: number) {
  const sessionId = randomUUID()

  sessions.set(sessionId, {
    user,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })

  return sessionId
}

export function getStoredSession(sessionId: string) {
  const session = sessions.get(sessionId)

  if (!session) {
    return null
  }

  if (session.expiresAt < Date.now()) {
    sessions.delete(sessionId)
    return null
  }

  return session
}

export function destroySession(sessionId: string) {
  sessions.delete(sessionId)
}
