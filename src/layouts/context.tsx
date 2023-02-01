import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAuthUser, updateAuthTokens } from "../redux/app"
import useAuthenticate from "./hooks/useAuthenticate"

import { Create } from "../apps/media"
import { useLayoutEffect } from "react"

import * as T from "./types"

const GlobalContext = createContext<T.GlobalContext>({})

function ContextProvider({ children }) {
    const { user, tokens, moods } = useSelector(
        (state: T.AppStore) => state.main,
    )

    const { authData, authPending } = useAuthenticate(user)

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
                    {moods.create && <Create />}
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
