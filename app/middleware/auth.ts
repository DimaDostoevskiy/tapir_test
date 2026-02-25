export default defineNuxtRouteMiddleware(async (to) => {
    try {
        const isAdminRoute = to.path.startsWith('/admin')
        const tokenFromQuery = typeof to.query.token === 'string' ? to.query.token.trim() : ''
        const cookieUser = useCookie<{ role: string, name: string } | null>('auth_user', {sameSite: 'lax'})

        if (tokenFromQuery) {
            const res = await $fetch<{ role: string, name: string }>('/api/auth/me', {
                query: {token: tokenFromQuery},
            })

            cookieUser.value = {
                role: res.role,
                name: res.name,
            }
        }

        if (isAdminRoute && cookieUser && cookieUser.value?.role !== 'ADMIN') {
            return navigateTo('/')
        }
    } catch {
        return navigateTo('/')
    }
})
