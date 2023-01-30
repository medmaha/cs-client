import LayoutsWrapper from "../layouts/LayoutsWrapper"
import NextJSProgressBar from "nextjs-progressbar"
import "../styles/index.scss"
import { useEffect, useState } from "react"
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants"

export default function App({ Component, pageProps }) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (document.readyState === "complete") {
            setLoaded(true)
        }
    }, [])

    return (
        <>
            {loaded && (
                <>
                    <NextJSProgressBar
                        color="var(--primary)"
                        startPosition={0.4}
                        transformCSS={(css) => {
                            // manipulate css string here

                            return <style>{css}</style>
                        }}
                    />
                    <LayoutsWrapper>
                        <Component {...pageProps} />
                    </LayoutsWrapper>
                </>
            )}
        </>
    )
}

