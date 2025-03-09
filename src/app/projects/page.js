import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { getApprovedProjects } from '@/lib/notion';
import styles from './page.module.css';

// Set dynamic rendering options for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Revalidate this data on every request

// This is a server component
export default async function ProjectsPage() {
    // Fetch approved projects (will run at request time, not build time)
    const projects = await getApprovedProjects();

    return (
        <div className={styles.projectsPage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageHeading}>Community Projects</h1>
                <p className={styles.pageDescription}>
                    Explore projects submitted by the Code101 community
                </p>
            </div>

            {projects.length > 0 ? (
                <div className={styles.projectsGrid}>
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.project_name}
                            owner={project.owner_name}
                            description={project.description}
                            repoLink={project.github_link}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.noProjects}>
                    <p>No approved projects yet. Be the first to submit one!</p>
                </div>
            )}
        </div>
    );
}
