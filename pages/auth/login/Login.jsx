import { useRouter } from "next/router"
import { useContext, useLayoutEffect } from "react"
import { GlobalContext } from "../../../src/layouts/context"
import { capitalize } from "../../../src/library/texts"
import Form from "../../../src/components/UI/Form"
import Toast from "../../../src/library/toast"
import { celesupBackendApi } from "../../../src/axiosInstance"
import useAuthAxiosRequests from "../../../src/hooks/auth/useAuthAxiosRequests"

//
export default function Login() {
    const globalContext = useContext(GlobalContext)
    const router = useRouter()
    const { data, sendRequest } = useAuthAxiosRequests()

    useLayoutEffect(() => {
        if (data) {
            router.replace("/")
            globalContext.storeDispatch(
                globalContext.updateAuthUser({
                    user: { ...data },
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
