import React, {
    useCallback,
    useContext,
    useReducer,
    useLayoutEffect,
    createContext,
} from "react"
import { GlobalContext } from "../../../../layouts/context"

import * as Types from "./types/CreatePost"

import PostForm from "./text"
import PhotoPreview from "./photo"

import { updateForm } from "../../../redux/createPost"

import fileUploader from "./uploader"
import PostCreateHeader from "./PostCreateHeader"
import PostCreateFooter from "./PostCreateFooter"

export const PostContext = createContext({})

export default function CreatePost({ setConfig }) {
    const globalContext = useContext(GlobalContext)
    const [state, reducerDispatch] = useReducer(reducer, {})

    useLayoutEffect(() => {
        localStorage.removeItem("cp")
        setConfig({
            header: <PostCreateHeader dispatcher={dispatcher} />,
            footer: (
                <PostCreateFooter dispatcher={dispatcher} uploader={() => {}} />
            ),
        })

        const action = globalContext.moods.createPost?.toLowerCase()
        switch (action) {
            case "photo":
            case "video":
                uploader(action)

            case "form":
            case "create":
                dispatcher()
                break
        }
        globalContext.storeDispatch(updateForm({ dispatch: true }))
        // return async () => {
        //     uploader("cleanUp")
        // }
        // eslint-disable-next-line
    }, [])

    const dispatcher = useCallback((payload = "FORM") => {
        const data = {
            type: payload.toUpperCase(),
            payload: { config: setConfig },
        }
        reducerDispatch(data)
    }, [])

    const uploader = useCallback(
        async (media: string) => {
            const [mediaType, fileBuffer] = await fileUploader(media)

            if (mediaType && fileBuffer) {
                globalContext.storeDispatch(
                    updateForm({
                        [mediaType]: fileBuffer,
                    }),
                )
                dispatcher("photo")
            }

            // eslint-disable-next-line
        },
        [globalContext, dispatcher],
    )

    return <>{state.currentJXS}</>
}

function reducer(state: Types.ReducerState, action: Types.ReducerAction) {
    switch (action.type) {
        case "FORM":
            return {
                currentJXS: getCurrentJsx(PostForm),
            }
        case "PHOTO":
            return {
                currentJXS: getCurrentJsx(PhotoPreview, action.payload.config),
            }
        // case "VIDEO":
        //     return {
        //         currentJXS: getCurrentJsx(VideoFileViewer),
        //     }
        // case "EDITOR":
        //     return {
        //         currentJXS: getCurrentJsx(PhotoEditor),
        //     }
        // case "PREVIEW":
        //     return {
        //         currentJXS: getCurrentJsx(PostPreview),
        //     }
        default:
            return state
    }
}

export function getCurrentJsx(Element: any, config?: () => void) {
    return <Element setConfig={config} />
}
