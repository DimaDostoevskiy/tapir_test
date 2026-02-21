export default defineNuxtRouteMiddleware(async (to) => {
    const isAdminRoute = to.path.startsWith('/admin')

    console.log('- - - MIDDLEWARE - - -')

    try {
        const cookieUser = useCookie<{ role: string, name: string } | null>('auth_user', {sameSite: 'lax'})

        if (!cookieUser.value) {
            const tokenFromStorage = localStorage.getItem('token')
            const res = await $fetch<{ role: string, name: string }>('/api/auth/me', {
                query: {token: tokenFromStorage},
            })

            cookieUser.value = {
                role: res.role,
                name: res.name,
            }
        }

        if (isAdminRoute && cookieUser && cookieUser.value?.role !== 'ADMIN') {
            return navigateTo('/')
        }
    } catch (err) {
        console.log(err)
        return navigateTo('/')
    }
})
