"use client";
import React, { useState } from "react";
import Button from "./Button";

export default function ProjectCard({ title, owner, description, repoLink }) {
    const [isHovered, setIsHovered] = useState(false);

    // Card container styles
    const cardStyle = {
        width: "280px",
        minHeight: "400px",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "1px solid var(--color-white)",
        // Switch background color slightly on hover
        backgroundColor: isHovered ? "#1a1a1a" : "var(--color-black)",
        color: "var(--color-white)",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",

        // Smooth background transition
        transition: "background-color 0.2s ease-out",
        cursor: "pointer",
    };

    // Title (h2) style
    const titleStyle = {
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "1.5rem",
        margin: 0,
    };

    // Owner (p) style
    const ownerStyle = {
        fontFamily: "var(--font-roboto)",
        fontWeight: "bold",
        marginTop: "2rem",
        marginBottom: 0,
        opacity: 0.9,
    };

    // Description (p) style
    const descriptionStyle = {
        fontFamily: "var(--font-roboto)",
        fontSize: "1rem",
        lineHeight: 1.6,
        margin: "2rem 0 0",
        flexGrow: 1, // Pushes button down
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                <h2 style={titleStyle}>{title}</h2>
                <p style={ownerStyle}>{owner}</p>
                <p style={descriptionStyle}>{description}</p>
            </div>

            <Button
                size="md"
                color="white"
                onClick={() => {
                    if (repoLink) window.open(repoLink, "_blank");
                }}
            >
                btw to the repo
            </Button>
        </div>
    );
}