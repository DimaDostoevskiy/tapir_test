export default defineNuxtRouteMiddleware(async (from, to) => {
    const token = typeof to.query.token === 'string' ? to.query.token.trim() : ``

    if (token) {
        await $fetch<{ role: string, name: string }>('/api/auth/me', {
            query: { token },
        }).then(res => {
            console.log(res);
        })
    }
})
