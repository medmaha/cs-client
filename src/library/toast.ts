import internal from "stream"
import { capitalize } from "./texts"

type InitOptions = {
    canClose?: boolean
    position?: string
    autoClose?: number
    showProgress?: boolean
    text: string
}

class CSToast {
    #toastElement: any
    #visibleSince: number
    #autoCloseTimeout: any
    #progressInterval: any
    #initOptions: InitOptions
    #removeFuncBind: () => void | null

    constructor(options: InitOptions) {
        this.#visibleSince = 0

        this.#toastElement = document.createElement("div")
        this.#toastElement.classList.add("toast")

        this.#removeFuncBind = this.remove.bind(this)

        this.#initOptions = { ...DEFAULT_OPTIONS, ...options }
        this.update({ ...DEFAULT_OPTIONS, ...options })
    }

    set text(value) {
        this.#toastElement.innerHTML = capitalize(value)
    }
    set className(value) {
        this.#toastElement.classList.add(value)
    }

    set position(value) {
        const selector = `.toast-container[data-position="${value}"]`

        const toastContainer =
            document.querySelector(selector) || createToastContainer(value)

        this.#toastElement.id =
            "toast-" + String(toastContainer.childNodes.length + Math.random())

        toastContainer.append(this.#toastElement)

        requestAnimationFrame(() => {
            this.#toastElement.classList.add("show")
            this.#toastElement.addEventListener("animationend", () => {
                this.#toastElement.addEventListener(
                    "click",
                    this.#removeFuncBind,
                )
            })
        })
    }

    set canClose(value) {
        if (!value) {
            this.#initOptions["autoClose"] = 0
            return
        }
    }

    set autoClose(value) {
        if (!value) {
            this.#initOptions["canClose"] = false
            return
        }

        if (this.#autoCloseTimeout !== null) {
            this.#initOptions["autoClose"] = value

            clearTimeout(this.#autoCloseTimeout)
        }

        this.#autoCloseTimeout = setTimeout(this.#removeFuncBind, value)
    }

    set showProgress(value) {
        if (!value || !this.#initOptions.canClose) return

        this.#toastElement.style.setProperty("--progress", 1)
        this.#toastElement.classList.add("can-close")

        let lastTimeUpdate = new Date()

        this.#progressInterval = setInterval(() => {
            //
            this.#visibleSince +=
                new Date().valueOf() - lastTimeUpdate.valueOf()

            this.#toastElement.style.setProperty(
                "--progress",
                1 - this.#visibleSince / this.#initOptions.autoClose,
            )

            lastTimeUpdate = new Date()
        }, 10)
    }

    remove() {
        if (!this.#initOptions.canClose || !this.#toastElement) return

        if (this.#autoCloseTimeout) clearTimeout(this.#autoCloseTimeout)

        clearInterval(this.#progressInterval)

        requestAnimationFrame(() => {
            this.#toastElement.classList.add("remove")
            this.#toastElement.classList.remove("show")

            this.#toastElement.addEventListener("animationend", () => {
                setTimeout(() => {
                    const container = this.#toastElement.parentElement
                    this.#toastElement.remove()
                    if (container?.hasChildNodes()) return
                    container.remove()
                }, 30)
            })
        })
    }

    update(options) {
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value
        })
    }
}

function createToastContainer(position) {
    const toastContainer = document.createElement("div")
    toastContainer.classList.add("toast-container")
    toastContainer.dataset.position = position
    document.body.appendChild(toastContainer)
    return toastContainer
}

const DEFAULT_OPTIONS = {
    canClose: true,
    position: "top-center",
    autoClose: 6000,
    showProgress: true,
}

export default CSToast
