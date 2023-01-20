import cookie from "cookie"
import jwtDecode from "jwt-decode"
import { celesupBackendApi } from "../../axiosConfig"

//
export function errorHandler(res, error) {
    if (error.response) {
        return res
            .status(error.response.status)
            .json({ message: error.response.data.message })
    } else if (error.request) {
        return res
            .status(408)
            .json({ message: "Unable to connect to Celesup server" })
    } else {
        return res.status(400).json({ message: error.message })
    }
}

//
export function setAuthCookies(res, tokens, expiresDate1, expiresDate2) {
    res.setHeader("Set-Cookie", [
        cookie.serialize("ata", `${tokens.access}`, {
            httpOnly: true,
            secure: false,
            expires: expiresDate1,
            path: "/",
        }),
        cookie.serialize("atr", `${tokens.refresh}`, {
            httpOnly: true,
            secure: false,
            expires: expiresDate2,
            path: "/",
        }),

        cookie.serialize("logged_in", `do_not_delete!`, {
            httpOnly: false,
            path: "/",
            expires: expiresDate2,
        }),
    ])
}

export function isAuthenticated(req, res) {
    if ((req.cookies.atr || req.cookies.ata) && req.cookies.logged_in)
        return true

    res.status(401).json({ message: "UnAuthorized" })
    return false
}

export async function checkRequestValidation(req, res) {
    const { ata: accessToken, atr: refreshToken } = req.cookies

    let decodedToken
    if (accessToken) {
        decodedToken = jwtDecode(accessToken)
    } else if (refreshToken) {
        decodedToken = jwtDecode(refreshToken)
    } else {
        return Promise.resolve("valid")
    }

    const expiresData = new Date(decodedToken.exp * 1000)
    const actualDate = new Date()

    const isExpired = expiresData < actualDate

    return new Promise((resolve) => {
        if (isExpired) {
            console.log("Token expired!")
            const config = {
                headers: {
                    Authorization: `Celesup ${accessToken}`,
                },
            }
            celesupBackendApi
                .post("/refresh/user/tokens", { refresh: refreshToken }, config)
                .then((response) => {
                    const tokens = {
                        access: response.data.access,
                        refresh: response.data.refresh,
                    }
                    const decodedAccessToken = jwtDecode(tokens.access)
                    const decodedRefreshToken = jwtDecode(tokens.refresh)
                    const expiresDate1 = new Date(decodedAccessToken.exp * 1000)
                    const expiresDate2 = new Date(
                        decodedRefreshToken.exp * 1000,
                    )
                    setAuthCookies(res, tokens, expiresDate1, expiresDate2)
                    resolve(tokens)
                })
                .catch((error) => {
                    if (error.response) {
                        resolve(401)
                    } else {
                        resolve("Uncaught error")
                    }
                })
        } else {
            resolve("valid")
        }
    })
}
