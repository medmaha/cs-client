import React from "react"
import { changeClassName } from "../../../libs/texts"

function Button(props) {
    const { className, text, __class, ...resProps } = props

    const _class = changeClassName(className, __class)

    return (
        <button {...resProps} className={_class}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: "Button",
    onClick: () => {},
    __class: "cs-button font-semibold capitalize",
    className: "",
    disabled: false,
    // onClick: () => {},
    // onClick: () => {},
    // onClick: () => {},
    // onClick: () => {},
}
export default Button
