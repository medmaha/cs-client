// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { celesupBackendApi } from "../../axiosConfig"
import {
    checkRequestValidation,
    errorHandler,
    isAuthenticated,
} from "./__utils"

export default async function feeds(req, res) {
    if (!isAuthenticated(req, res)) return

    let { ata } = req.cookies

    const data = await checkRequestValidation(req, res)

    if (data === 401) return res.status(401).json({ message: "UnAuthorized" })

    if (data === "Uncaught error")
        return res.status(400).json({ message: "Uncaught error" })

    if (data.access) {
        ata = data.access
    }

    celesupBackendApi
        .get("/feeds", { headers: { Authorization: `Celesup ${ata}` } })
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((err) => {
            errorHandler(res, err)
        })
}
