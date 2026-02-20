import type { AuthMeResponse, AuthUser } from '~/types/auth'

export function useAuth() {
  const user = useState<AuthUser | null>('auth:user', () => null)
  const isLoaded = useState<boolean>('auth:isLoaded', () => false)

  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  async function refresh() {
    const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

    try {
      const response = await $fetch<AuthMeResponse>('/api/auth/me', {
        headers,
        credentials: 'include',
      })

      user.value = response.user
    } catch {
      user.value = null
    } finally {
      isLoaded.value = true
    }
  }

  async function logout() {
    await $fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    user.value = null
    await navigateTo('/')
  }

  return {
    user,
    isLoaded,
    isAdmin,
    refresh,
    logout,
  }
}
