import { defineEventHandler, readBody } from 'h3'
import { postsService } from '../../services/postsService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return postsService.updatePost(body)
})
