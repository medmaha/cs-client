import { link } from "fs"
import React, {
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react"
import { celesupBackendApi } from "../../../axiosConfig"
import { CommentInterface } from "../../apps/comments/interface"

import { ReducerState, ReducerAction } from "./interface"

function initialData(): ReducerState {
    return {
        data: [],
        links: {
            next: null,
            prev: null,
        },
    }
}

export default function usePostComment(post_id: String) {
    const [comments, dispatch] = useReducer(reducer, initialData())
    const commentsRef = useRef(comments)

    useEffect(() => {
        commentsRef.current = comments
    }, [comments])

    const updateComments = useCallback((action: ReducerAction): void => {
        dispatch({ ...action })
    }, [])

    const getComments = useCallback(
        async function () {
            celesupBackendApi
                .get(`comments/${post_id}`)
                .then((res) => {
                    updateComments({
                        type: "INITIALIZE",
                        payload: { data: res.data },
                    })
                })
                .catch((res) => {})
        },
        [post_id, updateComments],
    )

    return { comments, getComments, updateComments }
}

// prettier-ignore
function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "INITIALIZE":
            return {
                ...action.payload.data,
            }
        case "INSERT_NEW_COMMENT":
            let comments = insertToComments(state, action.payload.comment)
            return {
                ...comments,
            }
        case "INSERT_NEW_REPLY":
            let commentsReplies = insertToCommentReplies(
                state,
                action.payload.comment_id,
                action.payload.reply,
            )
            return {
                ...commentsReplies,
            }

        default:
            return state
    }
}

// prettier-ignore
function insertToComments(comm:ReducerState, data:CommentInterface):ReducerState {
    const comments = {
        ...comm,
        data:[
            {...data, new:true},
            ...comm.data
        ]
    }    
    return comments
}

// prettier-ignore
function insertToCommentReplies(
    cmm: ReducerState,
    parent_id: string,
    data: CommentInterface,
): ReducerState {
    const comments = { ...cmm }

    function findParentCommentRecursively(
        comm: CommentInterface,
    ): CommentInterface {
        if (comm.id === parent_id) {
            return comm
        }
        for (const comment of comm.replies) {
            const parent = findParentCommentRecursively(comment)
            if (parent) {
                return parent
            }
        }
        return undefined
    }

    const parentComment = findParentCommentRecursively(comments.data[0])
    
    parentComment.replies.push({ ...data, new: true })

    return comments
}
