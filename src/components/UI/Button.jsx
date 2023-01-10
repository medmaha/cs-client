import React from "react"
import { changeClassName } from "../../../libs/texts"

function Button({ className, text, onClick, __class, disabled }) {
    __class = changeClassName(className, __class)

    return (
        <button disabled={disabled} className={__class} onClick={onClick}>
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
