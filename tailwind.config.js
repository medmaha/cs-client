/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./{layouts,pages,src}/**/*.{js,ts,jsx,tsx,css}",
        // "./pages/**/*.{js,ts,jsx,tsx}",
        // "./layouts/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                "sm-mobile": "480px",
                mobile: "480px",
                tablet: "640px",
                // => @media (min-width: 640px) { ... }

                laptop: "1024px",
                // => @media (min-width: 1024px) { ... }

                desktop: "1280px",
                // => @media (min-width: 1280px) { ... }
            },
        },
    },
    plugins: [],
}

