import { changeClassName } from "../../../libs/texts"

function Input({
    id,
    type,
    name,
    placeholder,
    altText,
    disabled,
    className,
    onClick,
    onInput,
    onBlur,
    __class,
}) {
    // if (!id) {
    //     id = `inputID-${Date.now()}`.replace(".", "")
    // }

    __class = changeClassName(className, __class)

    return (
        <input
            disabled={disabled}
            // id={id}
            name={name}
            type={type}
            alt={altText}
            className={__class}
            placeholder={placeholder}
            onClick={onClick}
            onInput={onInput}
            onBlur={onBlur}
        />
    )
}

Input.defaultProps = {
    id: "",
    name: "",
    type: "text",
    placeholder: "Search celesup",
    altText: "search bar",
    className: "",
    __class: "cs-input w-full",
    disabled: false,
    onClick: () => {},
    onInput: () => {},
    onBlur: () => {},
}

export default Input
