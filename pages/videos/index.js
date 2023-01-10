import React from "react"

export default function Videos() {
    return <div>Videos</div>
}

export async function getServerSideProps(ctx) {
    const isAuthenticated = ctx.req.cookies.atr

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
                // statusCode: 301,
            },
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}
