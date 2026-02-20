export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('request', (event) => {
        console.info('[REQ]', event.method, event.path)
    })

    nitroApp.hooks.hook('afterResponse', (event) => {
        console.info('[RES]', event.method, event.path, event.node.res.statusCode)
    })

    nitroApp.hooks.hook('error', (error, { event }) => {
        console.error('[ERR]', event?.method, event?.path, error)
    })
})
