import React, { useState, useRef, useEffect } from "react"
import Icon from "./Icon"

export default function Textarea(props) {
    const textareaRef = useRef(null)
    const height = "2.25rem"

    function computeHeight() {
        let h
        if (props.rows > 1) {
            h = `calc(${textareaRef.current.scrollHeight}px + (${
                height * props.rows
            }))`
        } else {
            h = height
        }

        return h
    }

    useEffect(() => {
        if (!textareaRef.current) return
        handleBlur()
    }, [textareaRef])

    const handleTextareaChange = (event) => {
        if (props.rows > 1) {
            textareaRef.current.style.height = `calc(${height} * ${props.rows})`
        } else {
            textareaRef.current.style.height = height
        }
        textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px"

        if (props.onChange) {
            props.onChange(event)
        }
    }

    function handleKeyDown(ev) {
        if (ev.key.toLowerCase() === "enter" && props.submitOnEnter) {
            ev.preventDefault()
            if (props.onSubmit) {
                props.onSubmit(ev)
            }
        }
    }

    const handleBlur = () => {
        if (props.rows > 1) {
            textareaRef.current.style.height = `calc(${height} * ${props.rows})`
        } else {
            textareaRef.current.style.height = height
        }
        // textareaRef.current.scrollTo(0, 0)
        textareaRef.current.scrollTop = 0
        // textareaRef.current.style.height = computeHeight()
    }

    const handleSubmit = () => {
        // Send the text to the GPT-3 model for processing
        const textarea = document.querySelector("#" + props.id)
        const ev = {
            target: textarea,
            currentTarget: textarea,
        }
        if (props.submitOnEnter) {
            props.onSubmit(ev)
        }
    }

    return (
        <div className="relative rounded-md shadow-sm">
            <textarea
                id={props.id}
                ref={textareaRef}
                name={props.name}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onChange={handleTextareaChange}
                className={`cs-textarea leading-5 transition ease-in-out sm:text-sm ${
                    props.icon ? "pr-[2.5rem]" : "pr-[.5rem]"
                }`}
                placeholder={props.placeholder}
            />

            {props.icon && (
                <div
                    className={`absolute inset-y-0 right-0 m-2 flex items-end justify-center`}
                >
                    <button
                        onClick={handleSubmit}
                        className="ml-2 p-1 rounded-md secondary-bg hover:bg-indigo-500 hover:text-white"
                    >
                        <Icon
                            name="paperPlain"
                            className={"w-[.95rem] h-[.95rem]"}
                        />
                    </button>
                </div>
            )}
        </div>
    )
}

Textarea.defaultProps = {
    rows: 2,
    name: "",
    icon: true,
    value: null,
    children: "",
    className: "",
    placeholder: "Enter your text here",
    childrenClassName: "",
    submitOnEnter: false,
    id: `random-${Math.random()}`,
    onSubmit: (ev = EventTarget) => {},
    onChange: (ev = EventTarget) => {},
}
