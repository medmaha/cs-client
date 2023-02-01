import React from "react"

export default function Discover() {
    return (
        <div className="flex flex-col justify-center items-center w-full mt-2">
            <h1 className="mt-2 text-center text-2xl font-bold tracking-wide">
                Under Development
            </h1>
            <p className="mt-2 text-center">
                this page is currently under development
            </p>
            <button className="m-1 text-primary">source code</button>
        </div>
    )
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
