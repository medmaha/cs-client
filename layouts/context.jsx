import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { celesupFrontendApi } from "../axiosConfig"
import CSCookie from "../libs/cookies"
import { updateAuthUser, updateAuthTokens } from "../src/redux/app"
import { useAuthenticated } from "../utils/hooks"

import Toast from "../libs/toast"
import { Create } from "../src/apps/media"
import { useLayoutEffect } from "react"

const GlobalContext = createContext()

function ContextProvider({ children }) {
    const { user, tokens, moods } = useSelector((state) => state.main)

    const { authData, authPending } = useAuthenticated(user)

    const storeDispatch = useDispatch()

    useLayoutEffect(() => {
        if (authData?.id) {
            storeDispatch(updateAuthUser({ user: authData }))
        }
        // eslint-disable-next-line
    }, [authData])

    const initialValues = {
        user,
        tokens,
        moods,
        storeDispatch,
        updateAuthUser,
        updateAuthTokens,
    }
    return (
        <GlobalContext.Provider value={{ ...initialValues }}>
            {!authPending && (
                <>
                    {children}
                    {moods.createPost && (
                        <Create type={moods.createPost.toLowerCase()} />
                    )}
                </>
            )}
        </GlobalContext.Provider>
    )
}

ContextProvider.defaultProps = {
    children: <></>,
}

export { GlobalContext }
export default ContextProvider
