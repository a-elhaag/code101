import { NextResponse } from 'next/server';
import { getApprovedProjects } from '@/lib/notion';

// Use number instead of function
export const revalidate = 0;

export async function GET() {
    try {
        const projects = await getApprovedProjects();

        return NextResponse.json({
            projects,
            timestamp: new Date().toISOString() // Add timestamp to verify fresh data
        });
    } catch (error) {
        console.error('Error fetching approved projects:', error);
        return NextResponse.json(
            { message: 'Failed to fetch projects', error: error.message },
            { status: 500 }
        );
    }
}
