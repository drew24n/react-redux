import {instance, response} from "./api"

type usersResponse<T> = {
    items: Array<T>
    totalCount: number
    error: string
}

export type userItem = {
    id: number
    name: string
    status: string | null
    followed: boolean
    photos: {
        small: string
        large: string
    }
}

export const apiUsers = {
    getUsers(pageNumber: number, pageSize: number, isFriend: boolean, term: string)  {
        return instance.get<usersResponse<userItem>>(`users?page=${pageNumber}&count=${pageSize}&friend=${isFriend}&term=${term}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<response>(`follow/${userId}`, {}).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<response>((`follow/${userId}`)).then(response => response.data)
    }
}
