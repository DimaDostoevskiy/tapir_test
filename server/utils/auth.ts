import type {H3Event} from 'h3'
import {createError, deleteCookie, getCookie, setCookie} from 'h3'
import {useRuntimeConfig} from '#imports'
import {createSession, destroySession, getStoredSession, type SessionUser} from './sessionStore'

function normalizeRole(role: string | undefined) {
    return String(role || '').trim().toUpperCase()
}

export async function fetchExternalUserByToken(token: string): Promise<SessionUser> {
    const normalizedToken = String(token || '').trim()
    if (!normalizedToken) {
        throw createError({statusCode: 401, statusMessage: 'Token is missing'})
    }

    const stubUser = {
        Name: 'John',
        Role: 'Admin',
    }

    let routToWhoami = `http://127.0.0.1:7000/api/auth/`

    if (process.env.NODE_ENV === 'dev') {
        routToWhoami = `http://127.0.0.1:45874/api/auth/`
    }

    await fetch(routToWhoami, {
        credentials: 'include',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            console.log(res)
            // stubUser.Name = x?.Name || 'John'
            // stubUser.Role = x?.Role || 'USER'
        })
    return {
        name: stubUser.Name,
        role: normalizeRole(stubUser.Role),
    }
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
    deleteCookie(event, runtimeConfig.sessionCookieName, {path: '/'})
}

export function createAuthSession(event: H3Event, user: SessionUser) {
    const runtimeConfig = useRuntimeConfig()
    const sessionId = createSession(user, runtimeConfig.sessionTtlSeconds)
    setAuthCookie(event, sessionId)
}

export function getCurrentUser(event: H3Event): SessionUser | null {
    const runtimeConfig = useRuntimeConfig()
    const sessionId = getCookie(event, runtimeConfig.sessionCookieName)

    if (!sessionId) {
        return null
    }

    const session = getStoredSession(sessionId)
    if (!session) {
        clearAuthCookie(event)
        return null
    }

    return session.user
}

export function logoutCurrentSession(event: H3Event) {
    const runtimeConfig = useRuntimeConfig()
    const sessionId = getCookie(event, runtimeConfig.sessionCookieName)

    if (sessionId) {
        destroySession(sessionId)
    }

    clearAuthCookie(event)
}

export function requireAdmin(event: H3Event) {
    const user = getCurrentUser(event)

    if (!user) {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }

    if (normalizeRole(user.role) !== 'ADMIN') {
        throw createError({statusCode: 403, statusMessage: 'Admin role required'})
    }

    return user
}
