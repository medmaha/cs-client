export type PostStats = {
    likes_count: number
    shares_count: number
    comments_count: number
    bookmarks_count: number
}
export type PostClient = {
    liked: boolean
    commented: boolean
    shared: boolean
    saved: boolean
}

export type PostPicture = {
    width: number
    height: number
    alt_text: string
    url: string
}

export type Post = {
    caption?: string
    excerpt?: string
    hashtags?: string
    created_at: string
    updated_at: string
    picture?: PostPicture

    stats: PostStats
    client: PostClient
}
