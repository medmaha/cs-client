// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwtDecode from "jwt-decode"

export default function authenticate(req, res) {
    const { access, refresh } = req.body["user"]

    if (access) {
        const accessTokenDecoded = jwtDecode(access)

        const user = accessTokenDecoded.data
        const expiresAt = accessTokenDecoded.exp

        res.setHeader("Set-Cookie", [
            `atr=${refresh};expires=${new Date(
                expiresAt * 1000,
            ).toUTCString()};httpOnly=true;path=/`,
            //
            `ata=${access};expires=${new Date(
                expiresAt * 1000,
            ).toUTCString()};httpOnly=true;path=/`,
            //
            `auth=${user.id}_${user.username};expires=${new Date(
                expiresAt * 1000,
            ).toUTCString()};path=/`,
        ])

        res.status(200).json(user)
    }
    res.status(401).json({ error: "Unauthorize or Invalid credentials" })
}
