import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { celesupBackendApi } from "../../axiosConfig"
import CSCookie from "../../libs/cookies"

export default function useAuthenticated(user) {
    const [controller, setController] = useState()
    const [rendered, updateRendered] = useState(0)
    const router = useRouter()
    const cookies = CSCookie()

    // const {data, pending, error} = useReducer(reducer,{data:null, pending:null, error:null})

    const [authData, setData] = useState(null)
    const [authError, setError] = useState(null)
    const [authPending, setPending] = useState(null)

    useEffect(() => {
        return () => {
            if (cookies.get("cs-csrfkey")) {
                setController(new AbortController())
                authenticate()
            } else {
                setError(true)
                router.replace("/auth/login")
            }
        }
    }, [user])

    useEffect(() => {
        // console.log(rendered)
    }, [rendered])

    async function authenticate() {
        setPending(true)
        const config = {
            signal: controller,
        }

        celesupBackendApi
            .get("/authenticate", config)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                if (err.response) {
                    setError(
                        err.response.data?.message ||
                            "Something went wrong auth hook",
                    )
                    setPending(false)
                } else {
                    setPending(false)
                    setError("Something went wrong auth hook")
                }
                if (err.response?.status >= 400) {
                    router.replace("auth/login")
                    setError("not_logged_in")
                }
            })
            .finally(setPending(false))

        updateRendered((prev) => prev++)
    }

    return { authData, authPending, authError }
}
