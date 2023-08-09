// eslint-disable-next-line @typescript-eslint/no-var-requires
const { verifyPatch } = require("next-ws/server");
verifyPatch()

/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.freepik.com",
            },
        ],
    }
};
