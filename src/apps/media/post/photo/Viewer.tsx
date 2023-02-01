import React, { useState, useEffect, useContext, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePostForm, updatePostPages } from "../../../../redux/create"
import Filter from "./Filter"

let Last_FILTER = ""

import CSCryptography from "../../../../library/crypto"

import * as T from "./types/viewer"
import * as ST from "../../../../redux/types"

export default function PhotoEditor({ setConfig }) {
    const [image, setImage] = useState<HTMLImageElement | null>(null)
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [canvasContext, setCanvasContext] =
        useState<CanvasRenderingContext2D | null>(null)

    const postImageViewerRef = useRef()

    const { form, pages } = useSelector(
        (state: ST.AppStore) => state.create.post,
    )
    const storeDispatch = useDispatch()

    useEffect(() => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = form.picture

        img.addEventListener("load", imageLoaded)

        // const cp = localStorage.getItem("cp")
        // if (cp) {
        //     const pages = JSON.parse(CSCryptography.decrypt(cp))
        //     pages["prev"] = {
        //         from: pages.prev.value,
        //         value: pages.current.from,
        //     }
        //     pages["current"] = { from: pages.current.value, value: "PHOTO" }
        //     pages["next"] = { from: "PHOTO", value: null }

        //     localStorage.setItem(
        //         "cp",
        //         CSCryptography.encrypt(JSON.stringify(pages)),
        //     )
        // }

        const prev = pages.current
        const current = "PHOTO"
        const next = "PREVIEW"

        storeDispatch(updatePostPages({ prev, next, current }))

        return () => {
            img.removeEventListener("load", imageLoaded)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (canvasContext) {
            renderImage(null)
            setConfig((prev) => ({
                ...prev,
                filter: (
                    <Filter
                        photo={image}
                        canvas={canvas}
                        canvasContext={canvasContext}
                        renderImage={renderImage}
                    />
                ),
            }))
        }
        // eslint-disable-next-line
    }, [canvasContext])

    async function imageLoaded(ev) {
        await resetFilters()
        const _image = await resizeImage(ev.target)

        const canvas = document
            .getElementById("postImageViewer__")
            .querySelector("canvas")

        _image.style.setProperty("object-fit", "cover")

        canvas.width = _image.width
        canvas.height = _image.height

        setImage(_image)
        setCanvas(canvas)
        setCanvasContext(canvas.getContext("2d"))
    }

    async function renderImage(filter) {
        if (filter || Last_FILTER) {
            canvasContext.filter = filter || Last_FILTER
            Last_FILTER = filter || Last_FILTER
        }
        canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height)
        updateFile()
    }

    async function resizeImage(photo: HTMLImageElement) {
        const MAX_WIDTH = 450
        const MAX_HEIGHT = 450
        let computed = false

        if (photo.naturalWidth > MAX_WIDTH) {
            const ASPECT_RATIO = MAX_WIDTH / photo.width
            photo.width = MAX_WIDTH
            photo.height = photo.height * ASPECT_RATIO
            computed = true
        }

        if (computed) {
            if (photo.height > MAX_HEIGHT) {
                const ASPECT_RATIO = MAX_HEIGHT / photo.height
                photo.height = MAX_HEIGHT
                photo.width = photo.width * ASPECT_RATIO
            }
        }

        return photo
    }

    async function resetFilters() {
        document
            .querySelectorAll("#photoEditor [data-filter]")
            .forEach((node: HTMLElement) => {
                const key = node.dataset.filter
                node.setAttribute(
                    "data-value",
                    `${defaultImageStyles[key].value}`,
                )
            })
        Last_FILTER = ""
    }

    function updateFile() {
        const MIME_TYPE = image.src.split(";")[0].split(":")[1]

        const dataURL = canvas.toDataURL(`${MIME_TYPE}`, 95)

        storeDispatch(updatePostForm({ picture: dataURL }))
    }

    return (
        <div
            id={"postImageViewer__"}
            ref={postImageViewerRef}
            className="min-h-[300px] h-max flex flex-col justify-between transition"
            data-photo-wrapper
        >
            <div
                className={`mt-2 flex-1 flex justify-center ${
                    canvas?.width < 0 ? "items-center" : ""
                }`}
            >
                <canvas
                    data-post-canvas
                    className="cs-outline rounded-md tertiary-bg outline-1 height-100 transition"
                    width={300}
                    height={300}
                ></canvas>
            </div>

            <div className="p-1">
                <Filter
                    photo={image}
                    canvas={canvas}
                    canvasContext={canvasContext}
                    renderImage={renderImage}
                />
            </div>
        </div>
    )
}

var defaultImageStyles = {
    brightness: { value: 100, prefix: "%" },
    saturate: { value: 100, prefix: "%" },
    contrast: { value: 100, prefix: "%" },
    blur: { value: 0, prefix: "px" },
    sepia: { value: 0, prefix: "%" },
    grayscale: { value: 0, prefix: "%" },
    "hue-rotate": { value: 0, prefix: "deg" },
}
