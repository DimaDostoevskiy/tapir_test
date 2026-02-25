import { defineEventHandler } from 'h3'

const MASKED_QUERY_KEYS = new Set(['token', 'access_token', 'refresh_token', 'authorization', 'password'])
const STATIC_FILE_EXTENSIONS = new Set([
  '.js', '.css', '.map', '.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf'
])

function sanitizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl, 'http://localhost')
    for (const key of url.searchParams.keys()) {
      if (MASKED_QUERY_KEYS.has(key.toLowerCase())) {
        url.searchParams.set(key, '***')
      }
    }
    return `${url.pathname}${url.search}`
  } catch {
    return rawUrl
  }
}

function shouldSkipLog(pathname: string): boolean {
  if (pathname.startsWith('/_nuxt/') || pathname.startsWith('/__nuxt_error')) {
    return true
  }

  const lowerPath = pathname.toLowerCase()
  for (const extension of STATIC_FILE_EXTENSIONS) {
    if (lowerPath.endsWith(extension)) {
      return true
    }
  }

  return false
}

function getPathname(rawUrl: string): string {
  try {
    return new URL(rawUrl, 'http://localhost').pathname
  } catch {
    return rawUrl
  }
}

export default defineEventHandler((event) => {
  const startedAt = Date.now()
  const method = event.node.req.method || 'GET'
  const rawUrl = event.node.req.url || '/'
  const pathname = getPathname(rawUrl)
  const skipLog = shouldSkipLog(pathname)

  if (skipLog) {
    return
  }

  const url = sanitizeUrl(rawUrl)
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const userAgent = getRequestHeader(event, 'user-agent') || 'unknown'

  event.node.res.on('finish', () => {
    const durationMs = Date.now() - startedAt
    const statusCode = event.node.res.statusCode

    console.log(
      `[request] ${method} ${url} -> ${statusCode} (${durationMs}ms) ip=${ip} ua="${userAgent}"`
    )
  })
})
