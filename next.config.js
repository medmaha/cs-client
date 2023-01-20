/** @type {import('next').NextConfig} */

const path = require("path")
const { Value } = require("sass")
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
                        value: "accepts,content-type,origin,authorization,x-csrftoken,x-requested-with",
                    },
                ],
            },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["localhost"],
    },
}

module.exports = nextConfig

