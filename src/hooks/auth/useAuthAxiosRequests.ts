import { useReducer, useEffect } from "react"
import { celesupBackendApi } from "../../../src/axiosInstance"
import Toast from "../../library/toast"
import CSCryptography from "../../library/crypto"
import { getErrorMessageFromRequest } from "../../../utils/getErrorMessageFromResponse"
import { AuthHookAction, AuthHookState, RequestParams } from "./interface"

export default function useAuthAxiosRequests() {
    const [state, dispatchState] = useReducer(reducer, {}, getInitializer)

    useEffect(() => {
        if (state.error) {
            new Toast({
                text: state.error,
                autoClose: 5000,
            })
        }
    }, [state.error])

    function sendRequest(options: RequestParams) {
        dispatchState({
            type: "REQUEST_START",
        })
        celesupBackendApi({
            url: options.url,
            method: options.method.toLowerCase(),
            data: options.data,
            headers: options.headers,
        })
            .then((res) => {
                const tokens = res.data.tokens

                if (tokens) {
                    localStorage.setItem("ata", tokens.access)
                    localStorage.setItem("atr", tokens.refresh)
                    localStorage.setItem("atr", tokens.refresh)

                    const decodedUserData = JSON.parse(
                        atob(tokens.access.split(".")[1]),
                    ).user
                    const encodedUserData = CSCryptography.encrypt(
                        JSON.stringify(decodedUserData),
                    )

                    localStorage.setItem("a-usr", encodedUserData)
                } else {
                    const encodedUserData = CSCryptography.encrypt(
                        JSON.stringify(res.data),
                    )
                    localStorage.setItem("a-usr", encodedUserData)
                }

                dispatchState({
                    type: "REQUEST_SUCCEED",
                    payload: { ...state, data: res.data },
                })
            })
            .catch((err) => {
                const errMsg = getErrorMessageFromRequest(err)
                dispatchState({
                    type: "REQUEST_FAILED",
                    payload: { ...state, error: errMsg },
                })
            })
            .finally(() => {
                dispatchState({
                    type: "REQUEST_FINISH",
                })
            })
    }

    const { data, error, pending } = state

    return {
        data,
        error,
        pending,
        sendRequest,
    }
}

function reducer(state: AuthHookState, action: AuthHookAction) {
    switch (action.type) {
        case "REQUEST_START":
            return {
                pending: true,
                error: null,
                data: null,
            }
        case "REQUEST_FINISH":
            return {
                ...state,
                pending: false,
            }
        case "REQUEST_SUCCEED":
            return {
                pending: false,
                error: null,
                data: action.payload.data,
            }
        case "REQUEST_FAILED":
            return {
                pending: false,
                error: action.payload.error,
                data: null,
            }

        default:
            return {
                pending: true,
                error: null,
                data: null,
            }
    }
}

function getInitializer(): AuthHookState {
    return {
        data: null,
        error: null,
        pending: false,
    }
}
