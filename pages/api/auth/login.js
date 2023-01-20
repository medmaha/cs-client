import axios from "axios"
import cookie from "cookie"
import jwtDecode from "jwt-decode"
import { CELESUP_BACKEND_URL } from "../../../axiosConfig"
import { errorHandler, setAuthCookies } from "../__utils"

export default function login(req, res) {
    const { method } = req

    if (method.toLowerCase() !== "post") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }

    const { username: email, password } = req.body

    const config = {
        headers: {
            Accepts: "application/json",
            "Content-Type": "application/json",
        },
    }

    axios
        .post(
            `${CELESUP_BACKEND_URL}/obtain/user/tokens`,
            { email: email, password: password },
            config,
        )
        .then(function (response) {
            const tokens = response.data
            const decodedAccessToken = jwtDecode(tokens.access)
            const decodedRefreshToken = jwtDecode(tokens.refresh)
            const expiresDate1 = new Date(decodedAccessToken.exp * 1000)
            const expiresDate2 = new Date(decodedRefreshToken.exp * 1000)

            setAuthCookies(res, tokens, expiresDate1, expiresDate2)
            res.status(200).json({ user: decodedAccessToken.user })
        })
        .catch(function (error) {
            console.log(error)
            errorHandler(res, error)
        })
}
