import {defineNitroPlugin} from '#imports'

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('request', (event) => {
        if (event.path == `/favicon.ico` || event.path == `/avatar.jpg`) return
        console.info(`[${new Date().toTimeString().split(' ')[0]}] [REQ]`, `-->`, event.method, event.path)
    })

    nitroApp.hooks.hook('afterResponse', (event) => {
        if (event.path == `/favicon.ico` || event.path == `/avatar.jpg`) return
        console.info(`[${new Date().toTimeString().split(' ')[0]}] [RES]`, event.node.res.statusCode, event.method, `/blog` + event.path, )
    })

    nitroApp.hooks.hook('error', (error, {event}) => {
        if (event?.path == `/favicon.ico` || event?.path == `/avatar.jpg`) return
        console.error(`[${new Date().toTimeString().split(' ')[0]}] [ERR]`, event?.method, event?.path, error)
    })
})
