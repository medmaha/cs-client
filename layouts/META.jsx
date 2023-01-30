import React from "react"
import Head from "next/head"

function META({ title, keywords }) {
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            {/* <link rel="favicon" href="#" /> */}
            <link rel="icon" href="#"></link>
            <title>{title}</title>
        </Head>
    )
}

META.defaultProps = {
    title: "Celesup Platform",
    keywords: "Celesup, Social Media, Celebrity, Supporter",
}

export default META
