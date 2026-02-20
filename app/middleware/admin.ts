export default defineNuxtRouteMiddleware(async () => {
  const { isAdmin, refresh } = useAuth()

  await refresh()

  if (!isAdmin.value) {
    return navigateTo('/')
  }
})
