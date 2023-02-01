import {} from "@reduxjs/toolkit"

import { User } from "../../types/user"

export type GlobalContext = {
    user?: User
    tokens?: {
        access: string | null
        refresh: string | null
    }
    activeLink?: "home" | "create" | "video" | "notification" | "messages"
    moods?: {
        create: false | string
        updateFeeds: false | string
        playingAudio: false | string

        loadingRequest: boolean | string
        errorMessage: boolean | string
        successMessage: boolean | string
        infoMessage: boolean | string
    }
}

export type CreateMedia = {
    post: {
        pages: {
            prev: null | string
            current: null | string
            next: null | string
        }
        form: {
            caption?: string
            excerpt?: string
            hashtags?: string
            picture?: string
            audio?: string
            video?: string
        }
    }

    video: {}
}

export type AppStore = {
    main: GlobalContext
    create: CreateMedia
}
