import { capitalize } from "./texts"

class Toast {
    #toastElement
    #removeFuncBind
    #pauseFuncBind
    #unpauseFuncBind
    #initOptions
    #autoCloseTimeout
    #visibleSince
    #isPaused
    #progressInterval

    constructor(options = {}) {
        this.#visibleSince = 0

        this.#toastElement = document.createElement("div")
        this.#toastElement.classList.add("toast")

        this.#removeFuncBind = this.remove.bind(this)

        this.#isPaused = false
        this.#pauseFuncBind = () => (this.#isPaused = true)
        this.#unpauseFuncBind = () => (this.#isPaused = false)

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
            this.#initOptions["autoClose"] = false
            return
        }
    }

    set autoClose(value) {
        console.log(value)
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

    set pauseOnHover(value) {
        if (value) {
            this.#toastElement.addEventListener(
                "mouseenter",
                this.#pauseFuncBind,
            )
            this.#toastElement.addEventListener(
                "mouseleave",
                this.#unpauseFuncBind,
            )
        } else {
            this.#toastElement.removeEventListener(
                "mouseenter",
                this.#pauseFuncBind,
            )
            this.#toastElement.removeEventListener(
                "mouseleave",
                this.#unpauseFuncBind,
            )
        }
    }

    set showProgress(value) {
        if (!value || !this.#initOptions.canClose) return

        this.#toastElement.style.setProperty("--progress", 1)
        this.#toastElement.classList.add("can-close")

        let lastTimeUpdate = new Date()

        this.#progressInterval = setInterval(() => {
            //
            if (!this.#isPaused) {
                this.#visibleSince += new Date() - lastTimeUpdate

                this.#toastElement.style.setProperty(
                    "--progress",
                    1 - this.#visibleSince / this.#initOptions.autoClose,
                )
            } else {
                const originalTime = this.#initOptions.autoClose

                const idleTime = new Date().getUTCMilliseconds() / 1000

                const computedTime =
                    originalTime +
                    idleTime +
                    (new Date() - (lastTimeUpdate - this.#visibleSince))

                // this.update({ autoClose: Math.floor(computedTime) })
            }

            lastTimeUpdate = new Date()
        }, 10)
    }

    pause() {
        this.#isPaused = true
    }
    unpause() {
        this.#isPaused = false
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
    position: "top-right",
    autoClose: 6000,
    showProgress: true,
    pauseOnHover: true,
}

export default Toast
