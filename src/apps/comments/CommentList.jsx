import React, { useContext, useEffect, useState } from "react"
import { celesupBackendApi } from "../../../axiosConfig"
import Comment from "./Comment"
import { CommentsContext } from "./CommentsWrapper"

export default function CommentList({ post }) {
    const commentsContext = useContext(CommentsContext)
    const { comments, setComments, insertToComments } = commentsContext

    // starting point
    useEffect(() => {
        commentsContext.fetchComments()
    }, [])

    const renderComments = (comments, hasNext) => {
        return comments.slice(0, 3).map((comment, idx) => {
            return (
                <div key={comment.id} className="w-full">
                    <Comment
                        data={{
                            ...comment,
                            post: post,
                        }}
                        hasNext={!!comments[idx + 1] || !!hasNext}
                    />
                    {comment.replies &&
                        comment.replies.length > 0 &&
                        renderComments(comment.replies, true)}
                </div>
            )
        })
    }

    return (
        <div className="">
            <div className="px-2 mobile:px-0">
                {comments.data?.length > 0 && (
                    <>
                        <span className="cs-divider"></span>
                        {renderComments(comments.data)}
                    </>
                )}

                {comments.data?.length > 3 && (
                    <button className="text-secondary text-sm cursor-pointer">
                        load more comments?
                    </button>
                )}
            </div>
        </div>
    )
}
