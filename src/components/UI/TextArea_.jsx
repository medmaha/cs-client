import { useRef, useEffect, useState } from "react"

import Icon from "./Icon"

export default function Textarea(props) {
    const instanceRef = useRef()
    const height = 2

    useEffect(() => {
        if (!instanceRef.current) return
        updateHeight()
        // instanceRef.current.style.height = `${height * props.row}rem`
    }, [instanceRef.current])

    function updateHeight() {
        instanceRef.current.style.height = `2rem`
        const scrollHeight = instanceRef.current.scrollHeight
        instanceRef.current.style.height = `${scrollHeight}px`
    }

    function handleTextareaChange(ev) {
        if (ev.code === "Enter" && props.submitOnEnter) {
            ev.preventDefault()
            makeSubmit(ev)
        }
        updateHeight()
        // ev.target.style.height = `${height * props.row}rem`
        // const scrollHeight = ev.target.scrollHeight
        // ev.target.style.height = `${scrollHeight}px`
    }

    function makeSubmit(ev) {
        if (!!props.onSubmit) {
            props.onSubmit(ev)
        }
    }

    return (
        <span className="width-100">
            <div className="flex flex-col w-full flex-grow relative">
                <textarea
                    style={{
                        maxHeight: "200px",
                        height: "24px",
                        overflowY: "hidden",
                    }}
                    onKeyDown={handleTextareaChange}
                    // rows="1"
                    ref={instanceRef}
                    placeholder=""
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
                />
                <button className="absolute p-1 rounded-md text-gray-500 bottom-0 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 20 20"
                        className="h-4 w-4 rotate-90"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </div>
            {/* <textarea
                name={props.name}
                data-id={props.id}
                ref={instanceRef}
                classNameAsin={
                    `resize-none_ _overflow-hidden rounded-md cs-textarea bg-secondary` +
                    props.className
                }
                onKeyDown={handleTextareaChange}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className="m-0 w-full resize-none border-0 bg-transparent py-0 pl-2 pr-2 focus:ring-0 focus-visible:ring-0 dark:bg-transparent cs-textarea"
            ></textarea>
            <span className={`pos-absolute ${props.childrenClassName}`}>
                <Icon name="paperPlain" />
            </span> */}
        </span>
    )
}

Textarea.defaultProps = {
    row: 1,
    name: "",
    value: null,
    children: "",
    className: "",
    placeholder: "",
    childrenClassName: "",
    submitOnEnter: false,
    id: `random-${Math.random()}`,
    onSubmit: (ev = EventTarget) => {},
    onChange: (ev = EventTarget) => {},
}
