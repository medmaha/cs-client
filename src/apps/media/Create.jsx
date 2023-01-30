import { Provider } from "react-redux"
import { createContext, useCallback, useEffect, useState } from "react"
import { AppStore } from "../../redux/store"

import Modal from "../../components/UI/Modal"

// ? Post Components
import CreatePost from "./post/CreatePost"

export default function Create({ onClick }) {
    const [modalConfig, updateModalConfig] = useState({})

    const setConfig = useCallback((data) => {
        return updateModalConfig((prev) => {
            return {
                ...prev,
                ...data,
            }
        })
    }, [])

    return (
        <>
            <Modal
                onClick={onClick}
                options={{}}
                headerContent={false}
                jsxHeaderContent={modalConfig.header || <></>}
                jsxFooterContent={modalConfig.footer || null}
                jsxContent={<CreatePost setConfig={setConfig} />}
            />
        </>
    )
}
