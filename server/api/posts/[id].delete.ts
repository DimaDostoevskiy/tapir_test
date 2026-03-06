import {defineEventHandler, getRouterParam} from 'h3'
import {postsService} from '../../services/postsService'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    return postsService.removePost(id)
})
