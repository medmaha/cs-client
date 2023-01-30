import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "./Button"
import Input from "./Input"

export default function Form({
    onSubmit,
    submitBtn,
    header,
    login,
    signup,
    fields,
    method,
}) {
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        //
    }, [validated])

    function handleFormChange(ev) {
        const inputs = ev.currentTarget.querySelectorAll("input")
        let valid

        for (const input of inputs) {
            if (input.value.length >= 2) {
                valid = true
            } else {
                valid = false
                break
            }
        }
        setValidated(valid)
    }

    return (
        <div className="max-w-[370px] w-full">
            <form
                onSubmit={onSubmit}
                method={method}
                onChange={handleFormChange}
                className="flex justify-center gap-2 cs-card"
            >
                <div className="w-[90%] flex flex-col gap-[1rem]">
                    <h3 className="text-center text-xl mb-2 tracking-wider cs-text-color">
                        {header}
                    </h3>
                    {[
                        fields.map((field, i) => (
                            <div className="" key={i}>
                                <Input
                                    className="py-2 text-lg"
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        )),
                    ]}
                    <div className="flex justify-end">
                        <Button
                            role="button"
                            text={submitBtn}
                            disabled={!validated}
                            className={`py-2 px-5 rounded-md w-full transition-[background-color] ${
                                validated
                                    ? "bg-primary text-white"
                                    : "tertiary-bg secondary-text"
                            }`}
                        />
                    </div>
                    {login && (
                        <>
                            <div className="flex items-center gap-3 cs-text-color">
                                <div className="border-b w-full max-w-[45%] cs-border"></div>
                                <div className="">OR</div>
                                <div className="border-b w-full max-w-[45%] cs-border"></div>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <Link
                                    href="/password/reset"
                                    className="text-primary cursor-pointer"
                                >
                                    Forgot password?
                                </Link>
                                <div className="pt-3">
                                    <span className="cs-text-muted">
                                        {"Don't"} have an account?{" "}
                                    </span>
                                    <Link
                                        href="/auth/register"
                                        className="text-primary cursor-pointer"
                                    >
                                        <span className="">Sign up</span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                    {signup && (
                        <>
                            <div className="flex flex-col gap-1 items-center">
                                <div className="pt-3">
                                    <span className="cs-text-muted">
                                        Already have an account?{" "}
                                    </span>
                                    <Link
                                        href="/auth/login"
                                        className="text-primary cursor-pointer"
                                    >
                                        <span className="">Log in</span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}

const _fields = [
    {
        type: "text",
        name: "username",
        placeholder: "username",
    },
    {
        type: "password",
        name: "password",
        placeholder: "password",
    },
]

Form.defaultProps = {
    onSubmit: () => {},
    submitBtn: "Submit",
    header: "Form Heading",
    login: false,
    signup: false,
    fields: _fields,
    method: "get",
}
