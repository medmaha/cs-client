import Link from "next/link"
import { useContext, useLayoutEffect, useState } from "react"
import Form from "../components/Form"

import CSCryptography from "../../../src/library/crypto"
import { celesupBackendApi } from "../../../src/axiosInstance"
import Popup from "../../../src/components/UI/Popup"

import useAuthAxiosRequest from "../../../src/hooks/auth/useAuthAxiosRequests"
import Toast from "../../../src/library/toast"
import { GlobalContext } from "../../../src/layouts/context"

type DataStructure = {
    phone?: string
    email?: string
    valid?: boolean
}

export default function VerifyAccount() {
    const [encryptedData, setEncryptedData] = useState<DataStructure>()
    const { data, sendRequest } = useAuthAxiosRequest()
    const [showPopup, setShowPopup] = useState(false)
    const globalContext = useContext(GlobalContext)

    const state = JSON.parse(localStorage.getItem("auth") || "{}")

    useLayoutEffect(() => {
        if (state) {
            const { key, value } = state

            if (key && value) {
                const decryptedKey = CSCryptography.decrypt(key)
                const decryptedValue = CSCryptography.decrypt(value)

                const __data = { valid: true }

                switch (decryptedKey) {
                    case "email":
                        __data["email"] = decryptedValue
                        break
                    case "phone":
                        __data["phone"] = decryptedValue
                        break
                    default:
                        __data["valid"] = false
                        break
                }

                setEncryptedData(__data)
            }
        }
    }, [])

    useLayoutEffect(() => {
        if (data) {
            new Toast({
                text: data.message,
            })
            setTimeout(() => {
                localStorage.removeItem("auth")
                window.location.href = "/"
            }, 5000)
        }
    }, [data])

    useLayoutEffect(() => {
        if (Object.keys(encryptedData).length > 0) {
            if (encryptedData.valid) {
                celesupBackendApi
                    .get("/account/verify")
                    .then((res) => {
                        //
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else alert("Unauthorize")
        }
    }, [encryptedData])

    function handleFormSubmit(ev) {
        ev.preventDefault()
        const code = ev.target["code"]

        const url = "account/verify"
        const form = new FormData()
        form.append("code", code.value)

        code.value = ""

        sendRequest({
            url,
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
                        verification={true}
                        method="post"
                        submitBtn="Submit Code"
                        fields={fields}
                        header={
                            <Heading
                                field={
                                    encryptedData.email
                                        ? "Email address"
                                        : "Phone number"
                                }
                                value={
                                    encryptedData.email
                                        ? encryptedData.email
                                        : encryptedData.phone
                                }
                            />
                        }
                    />
                    <div className="mt-2">
                        <Link
                            href="/auth/signup"
                            className="text-primary px-2 pb-[2px] border-b border-1 border-[var(--primary)]"
                            replace={true}
                            onClick={(ev) => {
                                ev.preventDefault()
                                setShowPopup(true)
                            }}
                        >
                            Change my email
                        </Link>
                    </div>
                </div>
            </div>
            {showPopup && (
                <Popup
                    // content={
                    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, incidunt?"
                    // }
                    onClose={() => setShowPopup(false)}
                    onConfirm={(config, cb) => {
                        const content = (
                            <div className="w-full text-left my-2 text-slate-800">
                                <label
                                    htmlFor="email"
                                    className="font-bold flex items-center gap-2"
                                >
                                    Email address{" "}
                                    <span
                                        className="text-primary cursor-default"
                                        title="required"
                                    >
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    id="email"
                                    name="email"
                                    className="w-full h-[50px] bg-slate-400 text-slate-800
                                    rounded-md border-0 outline-1 outline-slate-600 focus:outline-[var(--primary)]
                                    transition focus:outline focus:outline-2 placeholder:text-slate-800 px-3"
                                    placeholder={"email address"}
                                />
                                <div className="flex justify-end w-full mt-[0.10rem]">
                                    <button
                                        className=" text-secondary-dark cursor-pointer pb-[1px] px-1 border-0
                                        border-[var(--secondary-dark)] border-b-[1px]"
                                    >
                                        use Phone instead
                                    </button>
                                </div>
                            </div>
                        )
                        config.content = content
                        cb({ ...config })
                    }}
                />
            )}
        </div>
    )
}

const Heading = ({ field, value }) => (
    <>
        <b>Verify Your Email</b>
        <p className="text-sm">
            {"We've "} sent a confirmation code to the {field}
            <span className="text-secondary">
                {' "'}
                {value}
                {'" '}
            </span>
            you provided.
        </p>
    </>
)

// We sent an email to inmaha33@gmail.com
// To continue, please check your email and verify your account
// Please enter the verification code we sent to <+2203332050>

const fields = [
    {
        type: "text",
        name: "code",
        placeholder: "CODE",
        className: "text-center px-2 max-w-[130px] tracking-wider semibold",
        onKeyDown: (ev) => {
            if (ev.key.length === 1) {
                if (ev.key.match(/[0-9]/g || ev.code.match(/igit[0-9]/g))) {
                } else {
                    ev.preventDefault()
                }
            }
        },
        onChange: (ev) => {
            if (ev.target.length === 5) {
                ev.preventDefault()
                // ev.target.closest('form').submit()
            }
        },
        autoComplete: "Off",
    },
]
