import axios from "axios"

export const CELESUP_BACKEND_URL = process.env.CELESUP_BACKEND_URL
export const CELESUP_FRONTEND_URL = process.env.CELESUP_FRONTEND_URL

export const celesupBackendApi = axios.create({
    baseURL: CELESUP_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Celesup-APi": `${axios.VERSION}v`,
        // Authorization: "Bearer YOUR_TOKEN",
    },
})

celesupBackendApi.interceptors.request.use((config) => {
    return config
})

//? ----------------------------------------------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------------------------------------------
//? ----------------------------------------------------------------------------------------------------------------------------------

let cancel_2

export const celesupFrontendApi = axios.create({
    baseURL: CELESUP_FRONTEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// celesupFrontendApi.interceptors.request.use((config) => {
//     const cancelToken = axios.CancelToken.source()
//     cancel_2 = cancelToken.cancel
//     config.cancelToken = cancelToken.token
//     return config
// })
// celesupFrontendApi.interceptors.response.use(
//     (response) => {
//         return Promise.resolve(response)
//     },
//     (error) => {
//         if (axios.isCancel(error)) {
//             console.log("Request canceled", error.message)
//         } else {
//             console.log(error)
//         }
//         return Promise.resolve(error)
//     },
// )