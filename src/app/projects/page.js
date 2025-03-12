"use client";
import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import styles from './page.module.css';
import LoadingSpinner from '@/components/LoadingSpinner';
import NetworkBackground from "@/components/NetworkBackground";

// Remove these exports that are causing the error
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch projects from API endpoint
        fetch('/api/approved-projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data.projects || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching projects:", err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {/* Add the network background */}
            <NetworkBackground color="#007bff" density={12} speed={0.7} />

            <div className={styles.projectsPage}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageHeading}>Community Projects</h1>
                    <p className={styles.pageDescription}>
                        Explore projects submitted by the Code101 community
                    </p>
                </div>

                {loading ? (
                    <div className={styles.loading}>
                        <LoadingSpinner size="large" color="blue" />
                    </div>
                ) : projects.length > 0 ? (
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
        </>
    );
}
