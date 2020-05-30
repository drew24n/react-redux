import {instance, response} from "./api"

type user<C = {}> = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: C
    photos: {
        small: string
        large: string
    }
}

type contacts = {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    youtube?: string
    mainLink?: string
}

export const apiProfile = {
    getProfile(usersId: number) {
        return instance.get<user<contacts>>(`profile/${usersId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<response>(`profile/status`, {status}).then(response => response.data)
    },
    updateProfileInfo(data: user) {
        return instance.put<response>(`profile`, data).then(response => response.data)
    },
    updateProfilePhoto(photo: File) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put<response>(`profile/photo`, formData, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => response.data)
    }
}