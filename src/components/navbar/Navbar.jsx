import React, { useContext, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import NavigationLinks from "./NavigationLinks"

import Input from "../UI/Input"
import Icon from "../UI/Icon"
import Button from "../UI/Button"

import { GlobalContext } from "../../../layouts/context"
import Profile from "./Profile"
import { updateMoods } from "../../redux/app"

function Navbar() {
    const globalContext = useContext(GlobalContext)

    function createLinkHandler() {
        globalContext.storeDispatch(updateMoods({ createPost: "create" }))
    }

    return (
        <nav className="z-10 h-[65px] fixed top-0 left-0 w-full px-1 shadow-md shadow-grey-500/50 dark:shadow-slate-800/50">
            <div className="flex gap-[1rem] justify-between px-1 items-center mx-auto h-full lg:w-[90%]">
                {/* brand and searchBar*/}
                <div className="inline-flex flex-1 h-full items-center gap-[1rem] justify-between">
                    <h1>
                        <Link href="/" className="w-[35px] h-[35px]">
                            <Image
                                src={"/images/cs-logo.png"}
                                alt="celesup logo"
                                width={35}
                                style={{ objectFit: "cover" }}
                                height={35}
                            />
                        </Link>
                    </h1>

                    {globalContext.user && (
                        <form method="get" className="w-full">
                            <div
                                className="w-full inset overflow-hidden focus-within:outline-[var(--primary-light)]
                                focus-within:outline-[3px]
                                relative cs-outline outline-2 rounded-sm w-full"
                            >
                                <Input
                                    className={
                                        "w-full transition focus:pl-[35px] focus:outline-none bg-transparent outline-none sm:min-w-[300px] pl-[32px]"
                                    }
                                />

                                <div className="absolute hover:bg-gray-400 hover:bg-opacity-30 bg-opacity-30 bg-gray-300 h-full w-[30px] left-0 top-0">
                                    <div className="flex h-full w-full items-center justify-center">
                                        <button
                                            onClick={(ev) => {
                                                ev.preventDefault()

                                                const input = ev.target
                                                    .closest("form")
                                                    .querySelector("input")

                                                input.focus()

                                                if (!!!input.value.length)
                                                    return

                                                alert("searching")
                                            }}
                                        >
                                            <Icon
                                                name={"search"}
                                                className="fill-[var(--text-tertiary)]"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {globalContext.user && (
                    <div className="inline-flex h-full sm:flex-1 items-center gap-[1rem] justify-between">
                        <NavigationLinks
                            createLinkHandler={createLinkHandler}
                        />

                        <div className="inline-flex">
                            <Profile globalContext={globalContext} />
                        </div>
                    </div>
                )}

                {!globalContext.user && (
                    <div className="flex flex-1 gap-1 items-center justify-end min-w-max flex-1">
                        <Link
                            href="/auth/login"
                            className="text-gray-700 font-semibold p-1 px-2"
                        >
                            <span className="hover:text-primary tracking-wide">
                                Log in
                            </span>
                        </Link>
                        <Link href="/auth/register" className="p-1">
                            <Button
                                className={
                                    "bg-secondary text-white rounded-md py-2 px-3 font-semibold tracking-wide"
                                }
                                text={"Sign up"}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
