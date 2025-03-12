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
    try {
        if (process.env.NODE_ENV !== "production") {
            console.log("Fetching projects from Notion...");
        }
        // Query the database for approved projects
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Approved',
                checkbox: {
                    equals: true
                }
            },
            sorts: [
                {
                    property: 'Submission Date',
                    direction: 'descending'
                }
            ]
        });

        // Format the results
        return response.results.map(page => {
            const properties = page.properties;

            return {
                id: page.id,
                project_name: properties['Project Name']?.title?.[0]?.text?.content || 'Unnamed Project',
                github_link: properties['GitHub Link']?.url || '',
                owner_name: properties['Team/Owner']?.rich_text?.[0]?.text?.content || 'Anonymous',
                description: properties['Description']?.rich_text?.[0]?.text?.content || 'No description provided',
                submission_date: properties['Submission Date']?.date?.start || null
            };
        });
    } catch (error) {
        console.error('Error fetching projects from Notion:', error);
        return [];
    }
}
