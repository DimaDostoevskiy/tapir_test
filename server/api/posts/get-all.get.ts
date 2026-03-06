import {defineEventHandler} from 'h3'
import {postsService} from '../../services/postsService'

export default defineEventHandler(async () => await postsService.getAllPosts())
