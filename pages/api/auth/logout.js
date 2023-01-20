import { isAuthenticated } from "../__utils"

export default function logout(req, res) {
    if (!isAuthenticated(req, res)) return

    const { ata: access } = req.cookies
}
