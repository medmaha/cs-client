export interface AuthHookState {
    data: null | {
        message?: string
        email?: string
        phone?: string
    }
    error: string | null
    pending: boolean
}

export interface AuthHookAction {
    type:
        | "REQUEST_START"
        | "REQUEST_FINISH"
        | "REQUEST_SUCCEED"
        | "REQUEST_FAILED"

    payload?: AuthHookState
}

export interface RequestParams {
    url: string
    method: "GET" | "POST" | "PUT" | "DELETE"
    data?: FormData
    headers?: {
        "Content-type"?: string
    }
}
