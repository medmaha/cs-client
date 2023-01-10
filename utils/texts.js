// capitalized a given text
export function capitalize(value = "") {
    let data = ""
    if (value && value.length) {
        data = value.toLowerCase()
        data = data.split("")
    } else {
        return data
    }

    data[0] = data[0].toUpperCase()
    return data.join("")
}
