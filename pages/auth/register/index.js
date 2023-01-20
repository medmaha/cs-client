import React from "react"
import Form from "../../../src/components/UI/Form"

export default function Register() {
    return (
        <div className="flex justify-center w-full mt-[50px]">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    <Form
                        onSubmit={() => {}}
                        signup={true}
                        method="post"
                        submitBtn="Sign up"
                        fields={fields}
                        header={<Heading />}
                    />
                </div>
            </div>
        </div>
    )
}

const Heading = () => (
    <>
        <b>Join Celesup Today</b>
        <p className="text-sm">It’s quick and easy</p>
    </>
)

const fields = [
    {
        type: "text",
        name: "username",
        placeholder: "phone or email",
    },
    {
        type: "password",
        name: "password",
        placeholder: "password",
    },
]

export async function getServerSideProps(ctx) {
    const isAuthenticated = ctx.req.cookies.atr

    if (isAuthenticated) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
                // statusCode: 301,
            },
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}
