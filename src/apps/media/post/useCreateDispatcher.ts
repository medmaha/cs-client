import { current } from "@reduxjs/toolkit"
import React, { useContext, useState, useEffect, useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import { GlobalContext } from "../../../../layouts/context"
import { updateMoods } from "../../../redux/app"
import { updateForm, updatePages } from "../../../redux/createPost"

import * as Types from "./types/PostCreateDispatcher"
import CSCryptography from "../../../../libs/crypto"

import { DefaultConfig, checkFormValidation } from "./utils"

export default function useCreateDispatcher(
    submitPostForm: (form: any, dispatcher: any) => any,
    screenDispatcher: Types.Dispatcher,
) {
    const globalContext = useContext(GlobalContext)
    const { storeDispatch } = globalContext

    const [config, setConfig] = useState({ ...DefaultConfig })
    const [validForm, setValidForm] = useState(false)

    const { form, pages } = useSelector(
        (state: Types.ReduxStoreState) => state.createPost,
    )

    useLayoutEffect(() => {
        // prettier-ignore
        const data = initialConfiguration(config, form, storeDispatch, screenDispatcher, submitPostForm)

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
        const data = initialConfiguration(
            config,
            form,
            storeDispatch,
            screenDispatcher,
            submitPostForm,
        )
        setPageConfiguration(data, setConfig)
        // eslint-disable-next-line
    }, [pages])

    return {
        config,
    }
}

function initialConfiguration(
    config: Types.InitialConfig,
    form: Types.Form,
    storeDispatch: Types.StoreDispatch,
    screenDispatcher: Types.Dispatcher,
    submitPostForm: (
        form: Types.SubmitPostForm,
        dispatcher: Types.StoreDispatch,
    ) => void,
): Types.InitialConfig {
    return {
        ...config,
        METHODS: {
            ...config.METHODS,
            onBackBtnClicked: () => {
                var cp = CSCryptography.decrypt(localStorage.getItem("cp"))
                console.log(cp)

                if (cp) {
                    const pages = JSON.parse(cp)
                    if (pages.prev.value) {
                        const _screen = pages.prev.value
                        if (_screen) {
                            screenDispatcher(_screen)
                        }
                    }
                }
            },
            onCloseBtnClicked: () => {
                storeDispatch(
                    updateMoods({
                        createPost: null,
                    }),
                )
                async function dispatchFormData() {
                    const closure = async (): Promise<void> => {
                        return new Promise((resolve) => {
                            if (checkFormValidation(form)) {
                                // Todo --> show dialog to alert ht user that the data would'nt be saved
                            }
                            storeDispatch(updateForm({ dispatch: true }))
                            storeDispatch(updatePages({ dispatch: true }))
                            localStorage.removeItem("cp")
                            resolve()
                        })
                    }
                    await closure()
                }
                dispatchFormData()
            },
            onActionBtnClicked: () => {
                var cp = localStorage.getItem("cp")
                if (cp) {
                    const pages = JSON.parse(CSCryptography.decrypt(cp))
                    if (pages.prev.value) {
                        const _screen = pages.prev.value
                        if (_screen) {
                            screenDispatcher(_screen)
                        }
                    }
                    if (pages.next.value) {
                        screenDispatcher(pages.next.value)
                    } else {
                        submitPostForm(form, storeDispatch)
                    }
                }
            },
        },
    }
}

function updateConfigHeaders(
    validForm: boolean,
    setConfig: (
        callback: (prev: Types.InitialConfig) => Types.InitialConfig,
    ) => void,
) {
    setConfig((prev) => ({
        ...prev,
        actionBtn: validForm,
    }))
}

function setPageConfiguration(
    config: any,
    setConfig: (
        callback: (prev: Types.InitialConfig) => Types.InitialConfig,
    ) => void,
) {
    const cp = localStorage.getItem("cp")
    if (cp) {
        const pages = JSON.parse(CSCryptography.decrypt(cp))
        switch (pages.current?.value) {
            case "FORM":
                setConfig({
                    ...config,
                    closeBtn: true,
                    backBtn: false,
                    editBtn: false,
                    seeBtn: false,
                    textTitle: "Create post",
                    actionText: pages.current.from ? "Next" : "Create",
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
    }
}
