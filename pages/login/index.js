import { useEffect } from "react"
import { ClientCookies } from "../../libs/cookies"
import Login from "./Login"

export default function Index() {
    const cookies = ClientCookies()

    useEffect(() => {
        console.log(cookies.get("atr"))
    }, [])

    return <Login />
}

export async function getServerSideProps(ctx) {
    const isAuthenticated = ctx.req.cookies.atr

    if (isAuthenticated) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
                // statusCode: 301,
            },
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}
