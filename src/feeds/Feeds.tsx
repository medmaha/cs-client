import React from "react"
import ModernModal from "../components/UI/ModalCard"
import PostContainer from "./posts"

export default function Feeds() {
    return (
        <div className="flex w-full max-w-[560px]">
            {/* <ModernModal /> */}
            <PostContainer />
        </div>
    )
}
