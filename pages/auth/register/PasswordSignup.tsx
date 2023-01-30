import React, { useEffect } from "react"
import Form from "../components/Form"
import { celesupBackendApi } from "../../../axiosConfig"

import useAuthAxiosRequests from "../../../src/hooks/auth/useAuthAxiosRequests"
import { useContext } from "react"
import { GlobalContext } from "../../../layouts/context"

interface Response {
    data: {
        email?: string
        phone?: string
    }
}

interface PasswordSignup extends Response {
    data: {
        email?: string
        phone?: string
    }
    onSubmittedData: (response: Response) => void
}

export default function PasswordSignup({
    data,
    onSubmittedData,
}: PasswordSignup) {
    const { data: response, sendRequest } = useAuthAxiosRequests()
    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        if (response) {
            globalContext.storeDispatch(
                globalContext.updateAuthUser({
                    user: {
                        ...response,
                    },
                }),
            )
            onSubmittedData({
                data: response,
            })
        }
        // eslint-disable-next-line
    }, [response])

    function handleFormSubmit(ev: HTMLFormElement): void {
        ev.preventDefault()

        const username = ev.target["username"]
        const password = ev.target["password"]

        const form = new FormData()

        form.append("username", username.value)
        form.append("password", password.value)

        if (data.email) {
            form.append("email", data.email)
        } else {
            form.append("phone", data.phone)
        }

        sendRequest({
            url: "/signup",
            method: "POST",
            data: form,
            headers: {
                "Content-type": "application/json",
            },
        })
    }
    return (
        <div className="flex justify-center w-full mt-[50px]">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    <Form
                        onSubmit={handleFormSubmit}
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
        <p className="text-sm">Specify a username and password to continue</p>
    </>
)

const fields = [
    {
        type: "text",
        name: "username",
        placeholder: "Username",
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
    },
]

export async function getServerSideProps(ctx) {
    const isAuthenticated = ctx.req.cookies["cs-csrkKey"]

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
        redirect: {
            destination: "/auth/register",
            permanent: false,
            // statusCode: 301,
        },
    }
}
