const JWT_LIKE_PATTERN = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

export default defineNuxtRouteMiddleware((to) => {
  if (!to.path || to.path === '/') {
    return
  }

  const pathWithoutSlash = to.path.startsWith('/') ? to.path.slice(1) : to.path

  // We only treat a single path segment as incoming token.
  if (!pathWithoutSlash || pathWithoutSlash.includes('/')) {
    return
  }

  if (!JWT_LIKE_PATTERN.test(pathWithoutSlash)) {
    return
  }

  return navigateTo(`/auth/callback?token=${encodeURIComponent(pathWithoutSlash)}`, { replace: true })
})
