import { UserInterface } from "../globalInterface"

export interface PostInterface {
    key: string
    author: UserInterface
    caption?: string
    excerpt?: string
    hashtags?: string
    picture: string
    video: string
    music: string
    created_at: string
    updated_at: string
}
