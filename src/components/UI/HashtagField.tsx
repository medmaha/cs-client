import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import Input from "./Input"

const HashtagField = (props) => {
    const [hashtags, setHashtags] = useState(props.value || "")

    const instanceRef = useRef(null)

    const { onChange, classes, value, ...restProps } = props

    useLayoutEffect(() => {
        instanceRef.current?.focus()
        instanceRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    useEffect(() => {
        onChange({
            target: {
                name: name,
                value: hashtags,
            },
        })
        // if (!hashtags) {
        // 	setHashtags('#')
        // }
        // eslint-disable-next-line
    }, [hashtags])

    function handleTagChange(e) {
        const character = e.nativeEvent.data?.toString().trim()
        const values = e.target.value.trim()

        if (character === "#") {
            setHashtags(values)
            return
        }
        if (character === " ") {
            setHashtags(values + " ")
            return
        }
        if (character) {
            computeHashtags(values)
            return
        }
        setHashtags(e.target.value)
    }

    function computeHashtags(values) {
        let data = []

        values.split(",").forEach((tag) => {
            const hashtag = tag.trim()

            if (hashtag === "#") {
                data = [...data]
            } else if (hashtag[0] === "#") {
                data = [...data, hashtag]
            } else {
                data = [...data, "#" + hashtag]
            }
        })

        let nested_data = []
        data.forEach((hashtag) => {
            hashtag.split(" ").forEach((tag) => {
                const __hashtag = tag.trim()
                if (!__hashtag) return

                if (__hashtag[0] === "#") {
                    nested_data = [...nested_data, __hashtag]
                } else {
                    nested_data = [...nested_data, "#" + __hashtag]
                }
            })
        })

        if (nested_data.length > 0) {
            data = nested_data
        }

        setHashtags(data.join(", ").trim())
    }

    return (
        <div className="d-block mb-4">
            <input
                ref={instanceRef}
                className={classes + " cs-input w-full tertiary-bg px-[.5rem]"}
                value={hashtags}
                onChange={handleTagChange}
                {...restProps}
            />
        </div>
    )
}

export default HashtagField
