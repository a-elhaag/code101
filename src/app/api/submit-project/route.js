import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Check if environment variables are set
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        console.error("Missing Notion credentials in environment variables");
        return NextResponse.json(
            { message: 'Server configuration error: Missing Notion credentials' },
            { status: 500 }
        );
    }

    // Initialize Notion client
    const notion = new Client({
        auth: process.env.NOTION_API_KEY,
    });

    const databaseId = process.env.NOTION_DATABASE_ID;

    try {
        // Parse request body
        const body = await request.json();
        console.log("Received submission:", body);

        const {
            project_name,
            github_link,
            owner_name,
            description,
            whatsapp_contact
        } = body;

        // Validate required fields
        if (!project_name || !github_link || !owner_name || !description || !whatsapp_contact) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Try to get database schema to check property names
        try {
            const dbSchema = await notion.databases.retrieve({
                database_id: databaseId
            });
            console.log("Database properties:", Object.keys(dbSchema.properties));
        } catch (err) {
            console.log("Could not retrieve database schema:", err.message);
        }

        // Create a new page (row) in the Notion database
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
            'Project Name': {
                title: [{ text: { content: project_name } }]
            },
            'GitHub Link': {
                url: github_link
            },
            'Team/Owner': {
                rich_text: [{ text: { content: owner_name } }]
            },
            'Description': {
                rich_text: [{ text: { content: description } }]
            },
            'WhatsApp Contact': {
                phone_number: whatsapp_contact
            },
            'Approved': {
                checkbox: false
            },
            'Submission Date': {
                date: { start: new Date().toISOString() }
            }
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Project submitted successfully'
        });
    } catch (error) {
        console.error('Error submitting to Notion:', error);
        console.error('Error details:', error.body ? JSON.stringify(error.body) : 'No additional details');

        // Provide more specific error messages
        let errorMessage = 'Failed to submit project';
        if (error.code === 'unauthorized') {
            errorMessage = 'Invalid Notion API key';
        } else if (error.code === 'object_not_found') {
            errorMessage = 'Notion database not found or no access';
        } else if (error.message) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { message: errorMessage, error: error.message },
            { status: 500 }
        );
    }
}
