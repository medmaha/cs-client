import React from "react"

export default function Discover() {
    return <div>Discover</div>
}

export async function getServerSideProps(ctx) {
    const isAuthenticated = ctx.req.cookies["cs-csrfkey"]

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
                // statusCode: 301,
            },
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}
