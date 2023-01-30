import React from "react"
import Icon from "../../../components/UI/Icon"

import * as Types from "./types/statistics"

export default function Interactions({
    dispatchPostReducer,
    handlePostLike,
    stats,
    client,
}: Types.DefaultProps) {
    return (
        <div className="interact gap-1 flex justify-between max-w-[90%] md:justify-around items-center mt-3">
            {/* liked */}
            {button(
                client.liked ? "heart" : "heartRegular",
                handlePostLike,
                "red",
                client.liked ? "fill-red-400" : "",
                stats.likes_count,
            )}
            {/* comment */}
            {button(
                "comment",
                () => {
                    dispatchPostReducer({
                        type: "TOGGLE_COMMENT",
                        payload: { data: true },
                    })
                },
                "blue",
                client.commented ? "fill-blue-400" : "",
                stats.comments_count,
            )}
            {/* shared */}
            {button(
                "share",
                () => {},
                "green",
                client.shared ? "fill-green-400" : "",
                stats.shares_count,
            )}
            {/* saved */}
            {button(
                "bookmark",
                () => {},
                "yellow",
                client.saved ? "fill-yellow-400" : "",
                stats.bookmarks_count,
            )}
        </div>
    )
}

function button(
    name: string,
    callback: (ev: any) => void,
    color: string,
    iconClass: string,
    stat: number,
) {
    return (
        <div className="flex flex-col justify-center items-center">
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
                <Icon
                    name={name}
                    className={iconClass || "W-[1rem] h-[1rem]"}
                />
            </button>

            <span className=" leading-none h-[1rem]">{stat}</span>
        </div>
    )
}
