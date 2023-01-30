import { useEffect } from "react"
import Form from "../components/Form"
import useAuthAxiosRequests from "../../../src/hooks/auth/useAuthAxiosRequests"

type Response = {
    data: {
        email?: string
        phone?: string
    }
}

type EmailSignup = {
    onSubmittedData: (response: Response) => void
}

export default function EmailSignup({ onSubmittedData }: EmailSignup) {
    const { data, sendRequest } = useAuthAxiosRequests()

    useEffect(() => {
        if (data) {
            onSubmittedData({
                data: data,
            })
        }
        // eslint-disable-next-line
    }, [data])

    function handleFormSubmit(ev: HTMLFormElement): void {
        ev.preventDefault()

        const field = ev.target["email"]

        const form = new FormData()
        form.append("email", field.value)
        form.append("initial", "1")

        sendRequest({
            url: "/signup",
            data: form,
            method: "POST",
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
        <p className="text-sm">It’s quick and easy</p>
    </>
)

const fields = [
    {
        type: "text",
        name: "email",
        placeholder: "Phone or email",
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
