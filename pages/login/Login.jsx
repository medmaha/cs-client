import Router from "next/router"
import { useContext } from "react"
import { GlobalContext } from "../../layouts/context"
import fetchRequest from "../../libs/fetch"
import Form from "../../src/components/UI/Form"
import { updateAuthUser } from "../../src/redux/app"
import Toast from "../../utils/toast"

//
export default function Login() {
    const globalContext = useContext(GlobalContext)

    async function submitForm(ev) {
        ev.preventDefault()

        const form = {}

        ev.currentTarget.querySelectorAll("input").forEach((element) => {
            form[element.name] = element.value
        })

        const response = await fetchRequest({
            url: "/obtain/user/tokens",
            method: "post",
            data: { ...form, email: form.username },
        })

        if (response.data) {
            const resp = await fetch("/api/authenticate", {
                method: "post",
                body: JSON.stringify({ user: response.data }),
                headers: { "Content-type": "application/json" },
            })

            //
            const data = await resp.json()

            if (data.id) {
                globalContext.storeDispatch(
                    globalContext.updateAuthUser({ user: data }),
                )
                Router.replace("/")
                return
            }
            new Toast({
                position: "top-center",
                text: "client server Side Error",
                className: "invalid",
            })
        } else if (response.error) {
            new Toast({
                position: "top-center",
                text: response.error,
                className: "invalid",
            })
        }
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
