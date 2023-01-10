import { useContext, useEffect } from "react"
import { useRouter } from "next/router"

import { GlobalContext } from "../layouts/context"

import Compose from "../src/components/UI/Compose"
import Feeds from "../src/feeds"

import jwtDecode from "jwt-decode"
import Suggestions from "../src/suggestions"

export default function Index({ user: data, tokens }) {
    const globalContext = useContext(GlobalContext)
    const router = useRouter()

    useEffect(() => {
        if (data && tokens) {
            globalContext.storeDispatch(
                globalContext.updateAuthUser({ user: data }),
            )
            globalContext.storeDispatch(
                globalContext.updateAuthTokens({ tokens: tokens }),
            )
        }
    }, [])

    return (
        <>
            <div id="indexPage" className="w-full flex justify-evenly md:gap-2">
                <div className="flex-1 p-1 hidden lg:inline-flex basis-[280px] max-w-[300px]">
                    <div className="flex.justify-content-center lg:p-2">
                        If you need to use a one-off flex-basis value that
                        doesn't make sense to include in
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-[.4rem] items-center lg:basis-[550px] min-h-[100vh] max-w-[610px]">
                    <Compose />
                    <Feeds />
                </div>

                <div className="flex-1 justify-center w-full hidden md:inline-flex basis-[300px] min-w-[300px] md:max-w-[320px] lg:max-w-[380px]">
                    <div className="flex justify-center lg:p-2 lg:pr-1 h-max flex-col w-full">
                        <Suggestions />
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const cookies = ctx.req.cookies

    const auth = !!cookies.atr && !!cookies.ata

    if (auth) {
        //
        const tokens = {
            access: cookies.ata,
            refresh: cookies.atr,
        }

        const user = jwtDecode(tokens.access)

        return {
            props: {
                user,
                tokens,
            },
        }
    }

    return {
        redirect: {
            destination: "/login",
            permanent: false,
            // statusCode: 301,
        },
    }
}

