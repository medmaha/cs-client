/** @type {import('next').NextConfig} */

const path = require("path")
// const withSession = require("next-session")

const nextConfig = {
    reactStrictMode: true,

    headers: async function () {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "accepts,content-type,origin,authorization,celesup-api,x-csrftoken,x-requested-with",
                    },
                ],
            },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: [process.env.IMAGE_DOMAIN || "", "localhost"],
    },
    env: {
        CELESUP_BACKEND_URL: process.env.CELESUP_BACKEND_URL,
        CELESUP_FRONTEND_URL: process.env.CELESUP_FRONTEND_URL,
    },
}

module.exports = nextConfig

