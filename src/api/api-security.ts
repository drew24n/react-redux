import {instance} from "./api"

type securityResponse = {
    url: string
}

export const apiSecurity = {
    getCaptcha() {
        return instance.get<securityResponse>(`security/get-captcha-url`).then(response => response.data.url)
    }
}