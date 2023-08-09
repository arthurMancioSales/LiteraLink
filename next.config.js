/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    images: {
        domains: ["books.google.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.freepik.com",
            },
            {
                protocol: "https",
                hostname: "books.google.com",
            },
        ],
    },
};
