import {defineEventHandler, getQuery} from 'h3'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const token = typeof query.token === 'string' ? query.token.trim() : ''

    const incognitoUser = {
        role: 'USER',
        name: 'John Doe'
    }

    // Для тестирования ролей
    if (token === 'USER') return incognitoUser
    if (token === 'ADMIN') return {role: 'ADMIN', name: 'Admin Admin'}
    if (token === 'CUSTOMER') return {role: 'CUSTOMER', name: 'Customer Customer'}

    return await $fetch<{ user?: { Role?: string, Name?: string } }>('http://127.0.0.1:7000/api/auth', {
        headers: {
            'Authorization': token,
        },
    }).then(res => {
        return {
            role: res?.user?.Role?.toString() || incognitoUser.role,
            name: res?.user?.Name?.toString() || incognitoUser.name,
        }
    }).catch(() => {
        return { ...incognitoUser }
    })
})
