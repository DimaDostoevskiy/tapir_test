
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    // const runtimeConfig = useRuntimeConfig()
    const query = getQuery(event)
    const token = typeof query.token === 'string' ? query.token.trim() : ''

    const incognitoUser = {
        role: 'USER',
        name: 'John Doe'
    }

    return await $fetch('http://127.0.0.1:8000/api/auth', {
        headers: {
            'Authorization': token,
        },
    }).then(res => {
        return {
            role: res?.user?.Role || incognitoUser.role,
            name: res?.user?.Name || incognitoUser.name,
        }
    }).catch(() => {
        return { ...incognitoUser }
    })
})
