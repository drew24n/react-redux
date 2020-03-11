import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "b7bce098-5291-4b73-9757-8bd9fdc7b010"},
});

export const API = {
    follow(id) {return instance.post(`follow/${id}`, {}).then(response => response.data)},
    unfollow(id) {return instance.delete(`follow/${id}`).then(response => response.data)},
    me() {return instance.get(`auth/me`).then(response => response.data)},
    getProfile(userId) {return instance.get(`profile/${userId}`).then(response => response.data)},
};