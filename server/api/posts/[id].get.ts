import { defineEventHandler, getRouterParam } from 'h3'
import { postsService } from '../../services/postsService'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'id') ?? ''
  return postsService.getOnePublicPost(param)
})
