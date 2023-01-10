import { capitalize } from "../../../utils/texts"
import Icon from "../UI/Icon"
import Link from "next/link"

export default function NavigationLinks() {
    function handleLinkClicked(ev) {
        const link =
            ev.target.closest("[data-link]") ||
            (ev.currentTarget.hasAttribute("data-link") && ev.target)

        if (!link) return

        console.log(link)
    }
    return (
        <div className="nav-links w-full hidden sm:inline-block gap-[1rem]">
            <ul className="flex items-center justify-evenly min-w-[200px] gap-[.5rem]">
                {links.map((link, idx) => {
                    return (
                        <li
                            data-link={link.icon}
                            key={idx}
                            title={capitalize(link.icon)}
                            className={`flex items-center ${
                                idx === 0 ? "active" : ""
                            }`}
                            onClick={handleLinkClicked}
                        >
                            {link.path ? (
                                <Link
                                    href={link.path}
                                    className="flex items-center"
                                >
                                    <Icon
                                        name={link.icon}
                                        className="md:w-[1.2rem] w-[1rem] cursor-pointer"
                                    />
                                </Link>
                            ) : (
                                <button className="flex items-center">
                                    <Icon
                                        name={link.icon}
                                        className="md:w-[1.2rem] w-[1rem] cursor-pointer"
                                    />
                                </button>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const links = [
    { icon: "house", path: "/" },
    { icon: "create", path: null },
    { icon: "hashtag", path: "/discover" },
    { icon: "video", path: "/videos" },
    { icon: "notification", path: null },
    { icon: "message", path: "/messages" },
]
