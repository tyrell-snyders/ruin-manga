/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'uploads.mangadex.org'
        }]
    }
}

module.exports = nextConfig