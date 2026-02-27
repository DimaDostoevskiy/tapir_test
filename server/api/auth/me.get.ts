import {defineEventHandler, getQuery} from 'h3'
import {useRuntimeConfig} from '#imports'

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

    const authUrl = (useRuntimeConfig().externalAuthUrl as string) || 'http://127.0.0.1:7000/api/auth'
    return await $fetch<{ user?: { Role?: string, Name?: string } }>(authUrl, {
        headers: {
            'Authorization': token,
        },
    }).then(res => {
        return {
            role: res?.user?.Role?.toString() || incognitoUser.role,
            name: res?.user?.Name?.toString() || incognitoUser.name,
        }
    }).catch(() => {
        return {...incognitoUser}
    })
})
