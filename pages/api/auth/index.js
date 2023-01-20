// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwtDecode from "jwt-decode"
import { celesupBackendApi } from "../../../axiosConfig"
import { errorHandler, isAuthenticated, setAuthCookies } from "../__utils"

export default async function authenticate(req, res) {
    if (!isAuthenticated(req, res)) return

    const { atr: refresh } = req.cookies
    let decodedRefreshToken
    let err = false
    try {
        decodedRefreshToken = jwtDecode(refresh)
    } catch (error) {
        const expiresAt = new Date("Thu, 01 Jan 1974 00:00:00 UTC")
        setAuthCookies(res, { refresh: "", access: "" }, undefined, expiresAt)
        err = true
    }

    if (err) {
        res.status(401).json({ message: "unAuthorize" })
        return Promise.resolve()
    }

    celesupBackendApi
        .post("/refresh/user/tokens", {
            user: decodedRefreshToken.user.id,
            refresh: refresh,
        })
        .then((response) => {
            const tokens = response.data
            const decodedAccessToken = jwtDecode(tokens.access)
            const decodedRefreshToken = jwtDecode(tokens.refresh)
            const expiresDate1 = new Date(decodedAccessToken.exp * 1000)
            const expiresDate2 = new Date(decodedRefreshToken.exp * 1000)

            setAuthCookies(res, tokens, expiresDate1, expiresDate2)
            res.status(200).json({ user: decodedAccessToken.user })
        })
        .catch((err) => {
            const expiresAt = new Date("Thu, 01 Jan 1974 00:00:00 UTC")
            setAuthCookies(
                res,
                { refresh: "", access: "" },
                undefined,
                expiresAt,
            )

            return errorHandler(res, err)
        })
}
