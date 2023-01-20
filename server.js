const express = require("express")
const next = require("next")
const cors = require("cors")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

server.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
)

server.get("*", (req, res) => {
    return handle(req, res)
})

app.prepare().then(() => {
    server.listen(3000, (err) => {
        if (err) throw err
        console.log("> Ready on http://localhost:3000")
    })
})
