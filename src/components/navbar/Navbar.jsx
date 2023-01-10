import React, { useContext } from "react"
import Image from "next/image"
import Link from "next/link"

import NavigationLinks from "./NavigationLinks"

import Input from "../UI/Input"
import Icon from "../UI/Icon"
import Button from "../UI/Button"

import { GlobalContext } from "../../../layouts/context"

function Navbar() {
    const globalContext = useContext(GlobalContext)

    return (
        <nav className="z-10 h-[65px] fixed top-0 left-0 w-full px-1 shadow-md shadow-grey-500/50 dark:shadow-slate-800/50">
            <div className="flex gap-[1rem] justify-between px-1 items-center mx-auto h-full lg:w-[90%]">
                {/* brand and searchBar*/}
                <div className="flex w-full justify-between md:gap-[1rem] gap-[.65rem] items-center">
                    <h1>
                        <Link
                            href="/"
                            className="flex gap-[.2em] items-center min-w-fit"
                        >
                            <Image
                                src={"/images/cs-logo.png"}
                                alt="logo"
                                width={35}
                                height={35}
                            />
                        </Link>
                    </h1>

                    {globalContext.user && (
                        <form action="" className="w-full ">
                            <div className="search-bar w-full sm:min-w-[250px] md:max-w-[450px]">
                                <div className="hidden sm:inline-block w-full">
                                    <Input
                                        className={"w-full bg-transparent"}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {globalContext.user && (
                    <div className="flex items-center md:w-full w-fit justify-between">
                        <NavigationLinks />

                        <div className="inline-flex sm:hidden mr-2">
                            <Icon
                                name={"search"}
                                className="cursor-pointer h-[1.25rem] w-[1.25rem]"
                            />
                        </div>

                        <div className="w-full flex justify-end max-w-[60px]">
                            <div className="profile cs-border border-2 h-[50px] w-[50px] rounded-full">
                                <Image
                                    src="/images/avatar.png"
                                    alt="avatar"
                                    className="rounded-full cursor-pointer"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {!globalContext.user && (
                    <div className="flex gap-1 items-center min-w-max flex-1">
                        <Link
                            href="/login"
                            className="text-gray-700 font-semibold p-1 px-2"
                        >
                            <span className="hover:text-primary tracking-wide">
                                Log in
                            </span>
                        </Link>
                        <Link href="/register" className="p-1">
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
