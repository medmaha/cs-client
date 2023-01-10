import React from "react"
import Post from "./post"

export default function PostContainer() {
    return (
        <div className="flex flex-col gap-[.5rem] mt-2 w-full">
            {[1, 2, 3, 4, 5].map((post) => {
                return (
                    <span key={post} className="hello">
                        <Post />
                    </span>
                )
            })}
        </div>
    )
}
