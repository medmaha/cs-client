import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import Button from "./Button"

export default function Modal(props) {
    const [isOpen, setIsOpen] = useState(false)

    return <ModalContent {...props} />
}

function ModalContent({
    title,
    content,
    onClose,
    showLogo,
    jsxContent,
    headerContent,
    jsxHeaderContent,
}) {
    const modalRef = useRef(null)

    useEffect(() => {
        if (!modalRef.current) return

        const timeout = setTimeout(() => {
            document.addEventListener("click", handleDocumentClick)
        }, 1000)

        document.body.style.overflow = "hidden"

        return () => {
            clearInterval(timeout)
            document.removeEventListener("click", handleDocumentClick)
            document.body.style.overflow = "auto"
        }
    }, [modalRef.current])

    let errorTimeout

    function handleDocumentClick(ev) {
        const modal = modalRef.current.querySelector("#cs-modal")

        if (ev.target === modal || ev.target.closest("#cs-modal")) return

        clearTimeout(errorTimeout)

        modal.classList.add("cs-shake-card")

        errorTimeout = setTimeout(() => {
            modal.classList.remove("cs-shake-card")
        }, 800)
    }

    var closeTimeout

    function closeModal() {
        const modal = modalRef.current.querySelector("#cs-modal")
        modalRef.current.style.transform = "scale(0)"

        clearTimeout(closeTimeout)

        closeTimeout = setTimeout(transitionEnd, 400)
    }

    function transitionEnd() {
        modalRef.current.remove()
        document.body.style.overflow = "auto"
        onClose(modalRef.current)
    }

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center z-10 transition transition-duration-[300ms]"
        >
            <div className="bg-transparent backdrop-blur-[3px] w-full p-3 h-full flex items-center justify-center">
                <div
                    id="cs-modal"
                    className="w-full p-0 max-w-[500px] pb-3 rounded-lg secondary-bg shadow shadow-black"
                >
                    <div className="">
                        {showLogo && (
                            <div className="max-h-[45px] py-auto w-full relative">
                                <div className="absolute left-2 top-2">
                                    <div className="text-[25px] rounded-full hover:bg-red-300 hover:bg-opacity-50 hover:text-red-600">
                                        <div
                                            className="flex justify-center items-center h-8 w-8 font-semibold"
                                            onClick={closeModal}
                                        >
                                            <button className="leading-none">
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full justify-center items-center">
                                    <Image
                                        alt="celesup logo"
                                        src="/images/cs-logo.png"
                                        width={30}
                                        height={50}
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            data-header
                            className={`px-4 min-h-[250px] overflow-y-auto overflow-x-hidden relative ${
                                !showLogo ? "mt-1" : ""
                            }`}
                            style={{ maxHeight: "calc(90vh - 50px" }}
                        >
                            <div
                                className="border-b border-1 cs-border bg-transparent
                                px-1 backdrop-blur-[4px] sticky top-0 left-0 w-full z-10"
                            >
                                {headerContent ? (
                                    <div className="flex h-[70px] w-full items-center">
                                        <div
                                            className={`flex-1 ${
                                                !showLogo
                                                    ? "flex gap-4 items-center"
                                                    : ""
                                            }`}
                                        >
                                            {!showLogo && (
                                                <div className="text-[25px] rounded-full hover:bg-red-300 hover:bg-opacity-50 hover:text-red-600">
                                                    <div
                                                        className="flex justify-center items-center h-8 w-8 font-semibold"
                                                        onClick={closeModal}
                                                    >
                                                        <button className="leading-none">
                                                            &times;
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="cursor-pointer w-max">
                                                <div
                                                    className={`${
                                                        showLogo
                                                            ? "pr-3"
                                                            : "px-3"
                                                    }`}
                                                >
                                                    <span className="inline-block text-xl font-semibold tracking-wider">
                                                        {title}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-full">
                                            <div className="">
                                                <Button
                                                    className={"rounded-lg"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[50px] w-full">
                                        {jsxHeaderContent}
                                    </div>
                                )}
                            </div>

                            <div className="px-2">{content || jsxContent}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    title: "Modal Title",
    content: null,
    headerContent: true,
    jsxHeaderContent: <></>,
    jsxContent: <></>,
    btnContent: "Button",
    jsxBtnContent: "",
    showLogo: false,
    onClose: () => {},
}
