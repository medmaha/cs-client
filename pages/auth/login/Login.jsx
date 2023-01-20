import { useRouter } from "next/router"
import { useContext } from "react"
import { GlobalContext } from "../../../layouts/context"
import { capitalize } from "../../../libs/texts"
import Form from "../../../src/components/UI/Form"
import Toast from "../../../libs/toast"
import { celesupBackendApi } from "../../../axiosConfig"

//
export default function Login() {
    const globalContext = useContext(GlobalContext)
    const router = useRouter()

    async function submitForm(ev) {
        ev.preventDefault()

        const form = {}

        ev.currentTarget.querySelectorAll("input").forEach((element) => {
            form[element.name] = element.value
        })

        // Todo --> filter formData

        // fetch("/api/auth/login", {
        //     method: "post",
        //     body: JSON.stringify(form),
        //     headers: { "Content-type": "application/json" },
        // })

        celesupBackendApi
            .post("/obtain/user/tokens", form)
            .then(({ data }) => {
                console.log(data)
                router.replace("/")
                globalContext.storeDispatch(
                    globalContext.updateAuthUser({
                        user: atob(data.access.split(".")[1]),
                    }),
                )
            })
            .catch((err) => {
                if (err?.response) {
                    new Toast({
                        position: "top-center",
                        text: capitalize(
                            err.response?.data.message || err.message,
                        ),
                        className: "invalid",
                    })
                    return
                }
                new Toast({
                    position: "top-center",
                    text: capitalize(err.response?.data.message || err.message),
                    className: "invalid",
                })
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
