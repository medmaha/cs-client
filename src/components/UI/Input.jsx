import { changeClassName } from "../../../libs/texts"

function Input(props) {
    const { altText, className, ...restProps } = props

    const __class = changeClassName(className, props.__class)

    return <input alt={altText} className={__class} {...restProps} />
}

Input.defaultProps = {
    id: "",
    name: "",
    type: "text",
    className: "",
    disabled: false,
    onBlur: () => {},
    onInput: () => {},
    onClick: () => {},
    onChange: () => {},
    altText: "search bar",
    __class: "cs-input w-full",
    placeholder: "Search celesup",
}

export default Input
