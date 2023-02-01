import { useContext, useState, useEffect } from "react"
import { Router, useRouter } from "next/router"
import { celesupBackendApi } from "../../../src/axiosInstance"
import CSCookie from "../../library/cookies"
import { useLayoutEffect } from "react"
import { getErrorMessageFromRequest } from "../../../utils/getErrorMessageFromResponse"

export default function useAuthenticated(user) {
    const router = useRouter()
    const cookies = CSCookie()

    // const {data, pending, error} = useReducer(reducer,{data:null, pending:null, error:null})

    const [authData, setData] = useState(null)
    const [authPending, setPending] = useState(true)

    function auth(path: string) {
        if (!path.match(/\/auth\//g)) {
            console.log(path)
            if (cookies.get("cs-csrfkey") || cookies.get("cs-auth-val")) {
                if (user?.id) {
                    setData(user)
                    setPending(false)
                } else {
                    authenticate()
                }
            } else {
                router.replace("/auth/login")
                setPending(false)
            }
        }
    }

    useLayoutEffect(() => {
        console.log("initial render")

        if (cookies.get("cs-csrfkey") || cookies.get("cs-auth-val")) {
            if (user?.id) {
                setData(user)
                setPending(false)
            } else {
                authenticate()
            }
        } else {
            if (!window.location.href.match(/\/auth\//g)) {
                router.replace("/auth/login")
            }
            setPending(false)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log("router events")
        router.events.on("routeChangeStart", auth)

        return () => {
            router.events.off("hashChangeStart", auth)
        }
        // eslint-disable-next-line
    }, [])

    async function authenticate() {
        setPending(true)
        celesupBackendApi
            .get("/authenticate")
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)

                // const errMsg = getErrorMessageFromRequest(err)
                // setError(errMsg)
            })
            .finally(() => {
                setPending(false)
            })
    }

    return { authData, authPending }
}
