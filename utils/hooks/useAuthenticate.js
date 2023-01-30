import { useContext, useState, useEffect } from "react"
import { Router, useRouter } from "next/router"
import { celesupBackendApi } from "../../axiosConfig"
import CSCookie from "../../libs/cookies"
import { useLayoutEffect } from "react"
import { getErrorMessageFromRequest } from "../getErrorMessageFromResponse"

export default function useAuthenticated(user) {
    const router = useRouter()
    const cookies = CSCookie()

    // const {data, pending, error} = useReducer(reducer,{data:null, pending:null, error:null})

    const [authData, setData] = useState(null)
    const [authPending, setPending] = useState(true)

    useLayoutEffect(() => {
        authenticate()
        // if (cookies.get("cs-csrfkey") || cookies.get("cs-auth-val")) {
        // authenticate()
        //     return
        // } else {
        //     setPending(false)
        //     router.replace("/auth/login")
        // }
    }, [])

    async function authenticate() {
        setPending(true)
        celesupBackendApi
            .get("/authenticate")
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                // const errMsg = getErrorMessageFromRequest(err)
                // setError(errMsg)
            })
            .finally(setPending(false))
    }

    return { authData, authPending }
}
