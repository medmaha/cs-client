import React from "react"
import Icon from "../../../components/UI/Icon"

export default function Interactions({
    data,
    options,
    setOptions,
    globalContext,
    handlePostLike,
}) {
    return (
        <div className="interact gap-1 flex justify-between max-w-[90%] md:justify-around items-center mt-3">
            {/* liked */}
            {button(
                (() => {
                    var icon = "heartRegular"

                    const hasLiked = data.likes.find((user) => {
                        return user.id === globalContext.user.id
                    })

                    if (hasLiked) {
                        icon = "heart"
                    }

                    return icon
                })(),
                handlePostLike,
                "red",
                (() => {
                    var _color = ""

                    const hasLiked = data.likes.find((user) => {
                        return user.id === globalContext.user.id
                    })

                    if (hasLiked) {
                        _color = "fill-red-400"
                    }

                    return _color
                })(),
            )}
            {/* comment */}
            {button(
                "comment",
                () => {
                    setOptions({ ...options, showComments: true })
                },
                "blue",
            )}
            {/* shared */}
            {button("share", () => {}, "green")}
            {/* saved */}
            {button("bookmark", () => {}, "yellow")}
        </div>
    )
}

function button(name, callback, color, iconClass) {
    return (
        <button
            className={`
                    p-3
                    rounded-full
                    transition
                    cs-interaction-btn
                    hover:bg-opacity-20
                    ${(() => {
                        var _color = ""
                        switch (color) {
                            case "red":
                                _color = "hover:bg-red-500 fill-red-400"
                                break
                            case "blue":
                                _color = "hover:bg-blue-500 fill-blue-400"
                                break
                            case "green":
                                _color = "hover:bg-green-500 fill-green-400"
                                break
                            case "yellow":
                                _color = "hover:bg-yellow-400 fill-yellow-300"
                                break
                            default:
                                break
                        }
                        return _color
                    })()}
                    `}
            onClick={callback}
        >
            <Icon name={name} className={iconClass || "W-[1rem] h-[1rem]"} />
        </button>
    )
}
