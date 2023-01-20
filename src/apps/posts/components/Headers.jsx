import React from "react"
import Icon from "../../../components/UI/Icon"
import UserCard from "../../../components/UI/UserCard"

export default function Headers({ data }) {
    return (
        <div className="flex mobile:flex-wrap gap-2 justify-between items-start w-full">
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <h3 className="tracking-wide font-semibold min-w-fit">
                        <UserCard
                            btnElement={
                                <span className="hover:underline pb-[2px]">
                                    Mahamed Toure
                                </span>
                            }
                            author={data.author}
                        />
                    </h3>
                    <div className="items-center secondary-text gap-1 sm:gap-3 min-w-fit">
                        <UserCard
                            btnElement={
                                <span className="transition hover:text-[var(--primary)]">
                                    @{data.author.username?.toLowerCase()}
                                </span>
                            }
                            author={data.author}
                        />
                    </div>
                </div>
                <div
                    className="flex mobile:hidden items-center"
                    title={data.created_at}
                >
                    <p className="text-sm tertiary-text truncate w-full">
                        {data.created_at}
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:pr-1 sm:flex-row sm:gap-2">
                <div className="justify-end flex items-center leading-[20px]">
                    <button
                        className="cursor-pointer rounded-full active:outline
                    outline-slate-500 p-1 outline-1 leading-[1rem]"
                    >
                        <Icon
                            name={"ellipsesHorizontal"}
                            className="w-[.5rem]_"
                        />
                    </button>
                </div>
                <div
                    className="hidden mobile:flex items-center sm:order-first"
                    title={data.created_at}
                >
                    <p className="text-sm tertiary-text truncate w-full leading-[1rem]">
                        {data.created_at}
                    </p>
                </div>
            </div>
        </div>
    )
}
