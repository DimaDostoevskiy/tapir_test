import { defineEventHandler, sendRedirect } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().app?.baseURL as string) || '/'
  const path = base.endsWith('/') ? base + 'favicon.ico' : `${base}/favicon.ico`
  sendRedirect(event, path, 302)
})
