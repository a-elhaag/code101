/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NOTION_API_KEY: process.env.NOTION_API_KEY,
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    },
    // Disable auto static optimization for all pages 
    // (use this only if absolutely necessary as it affects performance)
    // experimental: {
    //     appDir: true,
    // },
}

module.exports = nextConfig
