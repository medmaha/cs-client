import { capitalize } from "../../../utils"
import Icon from "./Icon"
import Image from "./Image"

export default function Compose() {
    return (
        <div
            id="composeCreate"
            className="sm:p-[1rem] flex-col flex justify-center min-h-[70px] w-full max-w-[560px] rounded-sm
            "
        >
            <div className="flex gap-2 items-center w-full ">
                <Image
                    src="/images/avatar.png"
                    width={50}
                    height={50}
                    alt="compose"
                    className="rounded-full outline-1 cs-outline"
                />
                <div className="w-full flex flex-col gap-4 h-max sm:px-1 py-2 justify-center">
                    <div
                        className="py-3 px-2 rounded-md cursor-pointer outline-2 cs-outline secondary-text"
                        onClick={(ev) => {
                            ev.preventDefault()
                            console.log(ev)
                        }}
                    >
                        <p className="max-w-fit cs-text-muted truncate w-full">
                            What's on your mind? {capitalize("Mahamed")}...
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {[
                            {
                                name: "addPhoto",
                                title: "Media",
                                color: "dark:fill-primary",
                            },
                            {
                                name: "emojiSmile",
                                title: "Media",
                                color: "dark:fill-primary",
                            },
                            {
                                name: "addPhoto",
                                title: "Media",
                                color: "dark:fill-primary",
                            },
                            {
                                name: "calender",
                                title: "Media",
                                color: "dark:fill-primary",
                            },
                        ].map((icon, i) => {
                            return (
                                <span
                                    key={i}
                                    title={capitalize(icon.title)}
                                    className="mx-1"
                                >
                                    <Icon
                                        name={icon.name}
                                        className={`cursor-pointer ${icon.color}`}
                                    />
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>

            <span className="cs-divider"></span>
        </div>
    )
}
