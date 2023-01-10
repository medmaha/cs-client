import { createContext, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAuthUser, updateAuthTokens } from "../src/redux/app"

const GlobalContext = createContext()

function ContextProvider({ children }) {
    const { user, tokens, moods } = useSelector((state) => state.main)

    const storeDispatch = useDispatch()

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
            {children}
        </GlobalContext.Provider>
    )
}

ContextProvider.defaultProps = {
    children: <></>,
}

export { GlobalContext }
export default ContextProvider
