const fs = require('fs');
const path = require('path');

// Base URL of your website
const BASE_URL = 'https://code101.xyz';

// Define your routes
const routes = [
    {
        path: '/',
        priority: 1.0,
        changefreq: 'weekly',
    },
    {
        path: '/about',
        priority: 0.8,
        changefreq: 'monthly',
    },
    {
        path: '/projects',
        priority: 0.9,
        changefreq: 'daily', // Projects page changes frequently due to new submissions
    },
    {
        path: '/submit',
        priority: 0.7,
        changefreq: 'monthly',
    },
    {
        path: '/crew',
        priority: 0.8,
        changefreq: 'monthly',
    },
    // Add any other static routes here
];

// Get the current date for lastmod
const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

// Generate the XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Add each route to the sitemap
routes.forEach((route) => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
});

// Close the XML
sitemap += `
</urlset>`;

// Write the sitemap to the public directory
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
