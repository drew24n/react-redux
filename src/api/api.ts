import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "483805f3-2b31-444d-b120-1a5c1e33d712"}
})

export type response<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
}