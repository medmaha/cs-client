import { Provider } from "react-redux"
import { createContext, useState } from "react"
import { AppStore } from "../../redux/store"

import Modal from "../../components/UI/Modal"

// ? Post Components
import CreatePost from "./post/CreatePost"

export default function Create({ onClick }) {
    const [config, setConfig] = useState({})
    return (
        <>
            <Modal
                onClick={onClick}
                options={{
                    maxHeight: true,
                    setHeader: <>{config.header || ""}</>,
                }}
                headerContent={false}
                jsxContent={<CreatePost setConfig={setConfig} />}
                jsxHeaderContent={config.header || <></>}
            />
        </>
    )
}
