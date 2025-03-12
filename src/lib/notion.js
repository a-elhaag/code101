import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

/**
 * Fetches approved projects from the Notion database
 * with dynamic revalidation
 */
export async function getApprovedProjects() {
    // Placeholder for fetching data from Notion
    return [];
}
