import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    timeout: 1000,
    headers: {
        Authorization: localStorage.getItem("_auth_token") ?? ""
    }
})