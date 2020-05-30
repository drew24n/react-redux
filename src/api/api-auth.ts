import {instance, response} from "./api"

type loginParams = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type meResponse = {
    data: {
        id: number
        email: string
        login: string
    }
}

type loginResponse = {
    data: {
        userId: number
    }
}

type logoutResponse = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const apiAuth = {
    me() {
        return instance.get<response<meResponse>>(`auth/me`).then(response => response.data)
    },
    login({email, password, rememberMe, captcha}: loginParams) {
        return instance.post<response<loginResponse>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<response<logoutResponse>>(`auth/login`).then(response => response.data)
    },
}

/*register new user api is not used due to CORS policy

export const register = (payload) => {
    const formData = new FormData()
    Object.keys(payload).map(key => formData.append("JoinModel." + key, payload[key]))
    return axios.post(`https://social-network.samuraijs.com/Auth/Auth/TryRegister`, formData,
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
}

 */