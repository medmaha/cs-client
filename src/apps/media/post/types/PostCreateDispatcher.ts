import { ReactNode } from "react"
import { Dispatch } from "@reduxjs/toolkit"

export type Dispatcher = (payload: string) => void

export type DefaultProps = {
    dispatcher: Dispatcher
}

export type StoreDispatch = Dispatch

export type Form = {
    caption?: string
    excerpt?: string
    hashtags?: string
    picture?: string
    audio?: string
    video?: string
}

export type Pages = {
    page: "string"
}

export type PostStore = {
    form: Form
    pages: Pages
}

export interface InitialConfig {
    seeBtn: string | boolean
    editBtn: string | boolean
    backBtn: string | boolean
    closeBtn: string | boolean
    actionBtn: boolean
    textTitle: undefined | string
    actionText: string

    METHODS: {
        onBackBtnClicked: (ev: any) => void
        onEditBtnClicked: (ev: any) => void
        onCloseBtnClicked: (ev: any) => void
        onActionBtnClicked: (ev: any) => void
        onDefaultBtnClicked: (ev: any) => void
    }
}

export interface ReduxStoreState {
    createPost: PostStore
    main: {}
}

export type SubmitPostForm = {
    caption?: string
    excerpt?: string
    hashtags?: string
    picture?: string | File
    audio?: string | File
    video?: string | File
}
