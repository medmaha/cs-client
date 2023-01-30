import { PostClient, PostStats } from "../../types/post"

type Dispatcher = {
    type: string
    payload: any
}

export type DefaultProps = {
    stats: PostStats
    client: PostClient
    handlePostLike: (ev) => void
    dispatchPostReducer: (action: Dispatcher) => void
}
