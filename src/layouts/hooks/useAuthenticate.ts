import { useContext, useState, useEffect } from "react"
import { Router, useRouter } from "next/router"
import { celesupBackendApi } from "../../../src/axiosInstance"
import CSCookie from "../../library/cookies"
import CSCryptography from "../../library/crypto"
import { useLayoutEffect } from "react"
import { getErrorMessageFromRequest } from "../../../utils/getErrorMessageFromResponse"

const cookies = CSCookie()
export default function useAuthenticated(user) {
    const router = useRouter()

    // const {data, pending, error} = useReducer(reducer,{data:null, pending:null, error:null})

    const [authData, setData] = useState(null)
    const [authPending, setPending] = useState(true)

    function auth(path: string) {
        const __auth = isAuthenticated(path)
        if (__auth === true) {
            let encryptedUserData = localStorage.getItem("a-usr")
            if (encryptedUserData) {
                const decryptedUserData = JSON.parse(
                    CSCryptography.decrypt(encryptedUserData),
                )
                setData(decryptedUserData)
                setPending(false)
            } else {
                authenticate()
            }
        } else if (__auth === "auth") {
            setData(null)
            setPending(false)
        } else {
            router.replace("/auth/login")
        }
    }

    useEffect(() => {
        const currentPath = window.location.href
        auth(currentPath)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
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
                const encryptedUserData = CSCryptography.encrypt(
                    JSON.stringify(res.data),
                )
                localStorage.setItem("a-usr", encryptedUserData)
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

function isAuthenticated(path: string): false | true | "auth" {
    const authRoutes = path.match(/\/auth\//g)
    const authPersistence =
        !!cookies.get("cs-auth_id") ||
        !!cookies.get("cs-auth-val") ||
        !!localStorage.getItem("ata")

    if (authRoutes) return "auth"

    if (!authPersistence) return false

    return true
}
