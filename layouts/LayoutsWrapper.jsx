import META from "./META"
import Navbar from "../src/components/navbar/Navbar"
import { Provider } from "react-redux"
import AppsReduxStore from "../src/redux/store"
import ContextProvider from "./context"
import { useEffect } from "react"

export default function LayoutsWrapper({ children }) {
    return (
        <Layout className="">
            <META />

            <Navbar />
            <div className="mt-[70px]"></div>
            <div className="flex justify-center mx-[5px] prose lg:prose-xl">
                <div className="mx-auto w-full prose lg:prose-xl">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

function Layout({ children }) {
    return (
        <>
            <Provider store={AppsReduxStore}>
                <ContextProvider>{children}</ContextProvider>
            </Provider>
        </>
    )
}
