import { createSlice, current } from "@reduxjs/toolkit"

export const CreateMedia = createSlice({
    name: "create",
    initialState: {
        post: {
            form: {
                caption: "",
                excerpt: "",
                hashtags: "",
                picture: "",
                audio: "",
                video: "",
            },
            pages: {
                prev: null,
                current: null,
                next: null,
            },
        },
        video: {
            form: {},
            pages: {},
        },
    },
    reducers: {
        updatePostForm: (state, action) => {
            if (action.payload.dispatch) {
                state.post.form = FORMS
            } else {
                console.log(action.payload)

                state.post.form = {
                    ...state.post.form,
                    ...action.payload,
                }
            }
        },
        updatePostPages: (state, action) => {
            if (action.payload.dispatch) {
                state.post.pages = PAGES
            } else if (action.payload.goBack) {
                state.post.pages = {
                    prev: null,
                    current: state.post.pages.prev,
                    next: state.post.pages.current,
                }
            } else {
                state.post.pages = {
                    ...state.post.pages,
                    ...action.payload,
                }
            }
        },
    },
})

const PAGES = {
    prev: null,
    current: null,
    next: null,
}

const FORMS = {
    caption: "",
    excerpt: "",
    hashtags: "",
    picture: "",
    audio: "",
    video: "",
}

export const { updatePostForm, updatePostPages } = CreateMedia.actions
export default CreateMedia.reducer
