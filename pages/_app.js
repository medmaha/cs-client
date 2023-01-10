import LayoutsWrapper from "../layouts/LayoutsWrapper"
import NextJSProgressBar from "nextjs-progressbar"
import "../styles/index.scss"

export default function App({ Component, pageProps }) {
    return (
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
    )
}

