import { changeClassName } from "../../../libs/texts"

import { iconsMap } from "../../../utils/iconsMap"

function Icon({ className, name, __class, title }) {
    const matchedIcon = iconsMap[name] || {}

    __class = changeClassName(className, __class)

    return (
        <svg
            className={__class}
            viewBox={matchedIcon.viewBox}
            title={title}
            xmlns="http://www.w3.org/2000/svg"
        >
            {matchedIcon.path}
        </svg>
    )
}

Icon.defaultProps = {
    className: "",
    title: "",
    __class: "w-[1.1rem]",
}

export default Icon
