import { useEffect, useState } from "react"
import { celesupBackendApi } from "../../../axiosConfig"

export default function useComments(post) {
    const [comments, updateComments] = useState({})

    function reRender() {
        const c = {
            ...comments,
        }
        updateComments(c)
    }

    function fetchComments() {
        const url = "/comments/list/" + post.key
        celesupBackendApi
            .get(url)
            .then((res) => {
                updateComments(res.data)
            })
            .catch((err) => {})
    }

    function insertToCommentReplies(comment, data) {
        const newComment = { ...comment }
        var newCommentsReply = [{ new: true, ...data }]

        if (comment.replies) {
            newCommentsReply = [...newCommentsReply, ...comment.replies]
        }

        newComment.replies = newCommentsReply

        const _comments = { ...comments }

        var a = []

        const newCommentDataIdx = _comments.data.findIndex((cmm) => {
            return cmm.id === newComment.id
        })

        if (newCommentDataIdx !== undefined) {
            _comments.data[newCommentDataIdx] = newComment
        }

        updateComments(_comments)
    }

    function insertToComments(data) {
        var newComments = { ...comments }
        var newCommentsData = [{ new: true, ...data }]

        if (newComments.data) {
            newCommentsData = [...newCommentsData, ...newComments.data]
        }

        updateComments({
            ...newComments,
            data: newCommentsData,
        })
    }

    return {
        comments,
        updateComments,
        reRender,
        fetchComments,
        insertToComments,
        insertToCommentReplies,
    }
}
