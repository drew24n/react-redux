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
    getUsers(currentPage, pageSize) {return instance.get(`users?page=${currentPage}&count=${pageSize}`)},
    getStatus(userId) {return instance.get(`profile/status/` + userId)},
    updateStatus(status) {return instance.put(`profile/status`, {status: status})},
    login({email, password, rememberMe}) {return instance.post(`/auth/login`, {email, password, rememberMe}).then(response => response.data)},
    logout() {return instance.delete(`auth/login`).then(response => response.data)},
    updateProfileInfo(info) {return instance.put(`profile`, info)},
    uploadPhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`profile/photo`, formData, {headers: {"Content-Type": "multipart/form-data"}})
    }
};