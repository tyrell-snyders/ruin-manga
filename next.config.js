/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['uploads.mangadex.org', 'static.animecorner.me'], // Add the allowed hostname
    },
}


module.exports = nextConfig