import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const token = typeof query.token === 'string' ? query.token.trim() : ''

    const incognitoUser = {
        role: 'USER',
        name: 'John Doe'
    }

    return await $fetch<{ user?: { Role?: string, Name?: string } }>('http://127.0.0.1:7000/api/auth', {
        headers: {
            'Authorization': token,
        },
    }).then(res => {
        console.log(res?.user?.Role)
        console.log(res?.user?.Name)
        return {
            role: res?.user?.Role?.toString() || incognitoUser.role,
            name: res?.user?.Name?.toString() || incognitoUser.name,
        }
    }).catch(() => {
        return { ...incognitoUser }
    })
})
