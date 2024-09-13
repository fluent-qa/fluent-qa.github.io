// next.config.mjs

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/slides/:path*',
                destination: '/api/slides/:path*',
            },
            {
                source: '/asset/:path*',
                destination: '/slides/asset/:path*',
            },
        ]
    },
}

export default nextConfig