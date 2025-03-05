import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function GET() {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        return NextResponse.json(
            { message: 'Missing Notion credentials' },
            { status: 500 }
        );
    }

    const notion = new Client({
        auth: process.env.NOTION_API_KEY,
    });

    try {
        // Get database schema
        const db = await notion.databases.retrieve({
            database_id: process.env.NOTION_DATABASE_ID
        });

        // Extract property names and types
        const properties = {};
        Object.keys(db.properties).forEach(key => {
            properties[key] = db.properties[key].type;
        });

        return NextResponse.json({
            success: true,
            database_id: process.env.NOTION_DATABASE_ID,
            title: db.title[0]?.plain_text || 'Untitled',
            properties
        });
    } catch (error) {
        console.error('Error fetching schema:', error);

        return NextResponse.json(
            { message: 'Failed to get schema', error: error.message },
            { status: 500 }
        );
    }
}
