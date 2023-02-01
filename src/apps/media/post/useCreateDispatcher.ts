import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import { GlobalContext } from "../../../layouts/context"
import { updateMoods } from "../../../redux/app"
import { updatePostForm, updatePostPages } from "../../../redux/create"

import * as T from "./types/PostCreateDispatcher"
import * as StoreTypes from "../../../redux/types"
import CSCryptography from "../../../library/crypto"

import { DefaultConfig, checkFormValidation } from "./utils"

export default function useCreateDispatcher(
    submitPostForm: (form: any, dispatcher: any) => any,
    screenDispatcher: T.Dispatcher,
) {
    const globalContext = useContext(GlobalContext)
    const { storeDispatch } = globalContext

    const [config, setConfig] = useState({ ...DefaultConfig })
    const [validForm, setValidForm] = useState(false)

    const { form, pages } = useSelector(
        (state: StoreTypes.AppStore) => state.create.post,
    )

    useLayoutEffect(() => {
        // prettier-ignore
        const data = initialConfiguration(config, form, pages, storeDispatch, screenDispatcher, submitPostForm)

        setConfig(data)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setValidForm(checkFormValidation(form))
    }, [form])

    useEffect(() => {
        updateConfigHeaders(validForm, setConfig)
    }, [validForm])

    useEffect(() => {
        if (pages.current) {
            console.log(pages)
            // prettier-ignore
            const data = initialConfiguration( config, form, pages, storeDispatch, screenDispatcher, submitPostForm)

            setPageConfiguration(data, pages, setConfig)
        }
        // eslint-disable-next-line
    }, [form, pages])

    return {
        config,
    }
}

function initialConfiguration(
    config: T.InitialConfig,
    form: T.Form,
    pages: T.Pages,
    storeDispatch: T.StoreDispatch,
    screenDispatcher: T.Dispatcher,
    submitPostForm: (
        form: T.SubmitPostForm,
        dispatcher: T.StoreDispatch,
    ) => void,
): T.InitialConfig {
    return {
        ...config,
        METHODS: {
            ...config.METHODS,
            onBackBtnClicked: () => {
                console.log(pages.prev)
                if (pages.prev) {
                    screenDispatcher(pages.prev)
                    storeDispatch(updatePostPages({ goBack: true }))
                }
            },
            onCloseBtnClicked: () => {
                storeDispatch(
                    updateMoods({
                        create: false,
                    }),
                )
                async function dispatchFormData() {
                    const closure = async (): Promise<void> => {
                        return new Promise((resolve) => {
                            if (checkFormValidation(form)) {
                                // Todo --> show dialog to alert ht user that the data would'nt be saved
                            }
                            storeDispatch(updatePostForm({ dispatch: true }))
                            storeDispatch(updatePostPages({ dispatch: true }))
                            localStorage.removeItem("cp")
                            resolve()
                        })
                    }
                    await closure()
                }
                dispatchFormData()
            },
            onActionBtnClicked: () => {
                if (pages.next) {
                    screenDispatcher(pages.next)
                } else {
                    submitPostForm(form, storeDispatch)
                }
            },
        },
    }
}

function updateConfigHeaders(
    validForm: boolean,
    setConfig: (callback: (prev: T.InitialConfig) => T.InitialConfig) => void,
) {
    setConfig((prev) => ({
        ...prev,
        actionBtn: validForm,
    }))
}

function setPageConfiguration(
    config: any,
    pages: T.Pages,
    setConfig: (callback: (prev: T.InitialConfig) => T.InitialConfig) => void,
) {
    switch (pages.current) {
        case "FORM":
            setConfig({
                ...config,
                closeBtn: true,
                backBtn: false,
                editBtn: false,
                seeBtn: false,

                textTitle: "Create post",
                actionText: pages.next ? "Next" : "Create",
            })
            break
        case "PHOTO":
            setConfig({
                ...config,
                closeBtn: false,
                backBtn: true,
                editBtn: true,
                seeBtn: true,
                textTitle: null,
                actionBtn: true,
                actionText: "Preview",
            })
            break
        case "PREVIEW":
            setConfig({
                ...config,
                editBtn: false,
                closeBtn: false,
                backBtn: true,
                seeBtn: false,
                textTitle: "Preview post",
                actionText: "Create",
            })
            break

        default:
            break
    }
    // const cp = localStorage.getItem("cp")
    // if (cp) {
    //     const pages = JSON.parse(CSCryptography.decrypt(cp))
    // }
}
