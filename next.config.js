/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NOTION_API_KEY: process.env.NOTION_API_KEY,
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    },
    // Remove or comment out any optimizeCss setting if present
    // experimental: {
    //   optimizeCss: true,
    // },
}

module.exports = nextConfig
