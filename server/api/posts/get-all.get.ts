import {defineEventHandler, getCookie, getQuery} from 'h3'
import {IListPostsParams, postsService} from '../../services/postsService'
import {IUserCookie} from "../../../app/types/user";

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as IListPostsParams
    const authUserRaw = getCookie(event, 'auth_user')
    const user: IUserCookie = JSON.parse(authUserRaw || '') as IUserCookie

    return await postsService.searchPost(query, user.role)
})
