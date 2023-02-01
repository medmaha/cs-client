import { changeClassName } from "../../library/texts"

import { iconsMap } from "../../../utils/iconsMap"

function Icon({ className, name, __class }) {
    const matchedIcon = iconsMap[name] || {}

    __class = changeClassName(className, __class)

    return (
        <svg
            className={__class}
            viewBox={matchedIcon.viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            {matchedIcon.path}
        </svg>
    )
}

Icon.defaultProps = {
    className: "",
    __class: "w-[1.1rem]",
}

export default Icon
