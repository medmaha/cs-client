import axios from "axios"
import jwtDecode from "jwt-decode"
import { ClientCookies } from "./libs/cookies"

const BASE_URL = "http://localhost:8000"

export const celesupBackendApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
})

celesupBackendApi.interceptors.request.use((config) => {
    async function compute() {}
    const cookies = ClientCookies()

    const c = cookies.get("ata")

    if (c) {
        const expiresAt = jwtDecode(c).exp

        if (expiresAt * 1000 + 10 - expiresAt * 1000 > 1) {
            console.log("accessToken expires")
        }
        console.log(c)
    }
    return config
})
