import { ReducerAction, ReducerState } from "../../hooks/comments/interface"
import { UserInterface } from "../globalInterface"
import { PostInterface } from "../posts/interfaces"

export type Comments = {
    objects_count?: number
    page_index?: number
    page_size?: number
    links: {
        next: string | null
        prev: string | null
    }
    data?: CommentInterface[]
}

export interface CommentsWrapperPropsInterface {
    post: PostInterface
}

export interface CommentListPropsInterface {
    comments: Comments
    post: PostInterface
    getComments: () => {}
    updateComments: any
}

export interface CommentInterface {
    id?: string
    new?: boolean
    content?: string
    created_at?: string
    updated_at?: string
    file?: string
    parent?: CommentInterface | null
    replies?: CommentInterface[]
    author?: UserInterface
    likes?: UserInterface[]
    post: PostInterface
}

export interface updateCommentsCallBackInterface {
    type: string
    payload: {
        comment_id?: string
        reply?: CommentInterface
    }
}

export interface CommentPropsInterface {
    data: CommentInterface
    hasNext: boolean
    updateComments: (data: ReducerAction) => {}
}
