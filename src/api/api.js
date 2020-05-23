import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "483805f3-2b31-444d-b120-1a5c1e33d712"}
})

export const apiAuth = {
    me() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login({email, password, rememberMe, captcha}) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    },
}

export const apiSecurity = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`).then(response => response.data.url)
    }
}

export const apiUsers = {
    getUsers(pageNumber, pageSize, isFriend, term) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}&friend=${isFriend}&term=${term}`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {}).then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete((`follow/${userId}`)).then(response => response.data)
    }
}

export const apiProfile = {
    getProfile(usersId) {
        return instance.get(`profile/${usersId}`).then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status}).then(response => response.data)
    },
    updateProfileInfo(data) {
        return instance.put(`profile`, data).then(response => response.data)
    },
    updateProfilePhoto(photo) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => response.data)
    }
}

/*register new user api is not used due to CORS policy

export const register = (payload) => {
    const formData = new FormData()
    Object.keys(payload).map(key => formData.append("JoinModel." + key, payload[key]))
    return axios.post(`https://social-network.samuraijs.com/Auth/Auth/TryRegister`, formData,
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
}

 */