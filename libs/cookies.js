//

// ? Client side cookie hanlder
function ServerCookies(req, res, action) {
    //
    function set(name, value, days, httpOnly) {
        var expires = ""
        var _httpOnly = ""

        if (days) {
            var date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expires = "; expires=" + date.toUTCString()
        }
        if (httpOnly) {
            _httpOnly = "; httpOnly=true"
        }

        res.setHeader(
            "set-cookie",
            `${name}=${value} ${expires} ${_httpOnly}; path=/"`,
        )
    }
    function get(name) {
        const cookie = req.headers.cookie(name)
        if (cookie) return cookie

        return null
    }

    function del() {}

    return { set, get, del }
}

// ? Client side cookie hanlder
function ClientCookies() {
    //
    function set(name, value, days, httpOnly) {
        var expires = ""
        if (days) {
            if (String(days).length < 3) {
                var date = new Date()
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
                expires = "expires=" + date.toUTCString()
            } else {
                expires = "expires=" + days
            }
        }

        var _httpOnly = ""
        if (httpOnly) {
            _httpOnly = "httpOnly=true"
        }
        document.cookie = `${name}=${value};${expires};${_httpOnly};path=/"`
    }
    function get(name) {
        var nameEQ = name + "="
        var ca = document.cookie.split(";")
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == " ") c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length)
        }
        return null
    }
    function del(name) {
        document.cookie =
            name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }

    return { set, get, del }
}

export { ServerCookies, ClientCookies }
