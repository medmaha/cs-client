import { useRouter } from "next/router"
import { useContext, useLayoutEffect } from "react"
import { GlobalContext } from "../../../src/layouts/context"
import Form from "../../../src/components/UI/Form"
import useAuthAxiosRequests from "../../../src/hooks/auth/useAuthAxiosRequests"
import { updateAuthUser } from "../../../src/redux/app"

//
export default function Login() {
    const globalContext = useContext(GlobalContext)
    const router = useRouter()
    const { data, sendRequest } = useAuthAxiosRequests()

    useLayoutEffect(() => {
        if (data) {
            router.replace("/")
            const tokens = data.tokens
            let user
            if (tokens) {
                const decodedToken = JSON.parse(
                    atob(tokens.access.split(".")[1]),
                )
                user = decodedToken.user
            } else {
                user = { ...data }
            }
            globalContext.storeDispatch(
                updateAuthUser({
                    user: user,
                }),
            )
        }
        // eslint-disable-next-line
    }, [data])

    async function submitForm(ev) {
        ev.preventDefault()

        const form = new FormData()

        ev.currentTarget.querySelectorAll("input").forEach((element) => {
            form.append(element.name, element.value)
        })

        // Todo --> filter formData

        sendRequest({
            url: "/login",
            data: form,
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        })
    }
    return (
        <div className="flex justify-center w-full mt-[60px]">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    <Form
                        onSubmit={submitForm}
                        login={true}
                        method="post"
                        submitBtn="Log in"
                        header={<Heading />}
                        fields={fields}
                    />
                </div>
            </div>
        </div>
    )
}

const Heading = () => <b>Sign in to Celesup</b>

const fields = [
    {
        type: "text",
        name: "username",
        placeholder: "Username or email",
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
    },
]
