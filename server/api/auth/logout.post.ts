import { logoutCurrentSession } from '../../utils/auth'

export default defineEventHandler((event) => {
  logoutCurrentSession(event)

  return {
    ok: true,
  }
})
