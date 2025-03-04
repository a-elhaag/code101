"use client";
import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

export default function ProjectCard({ title, owner, description, repoLink }) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Track mouse position for highlight effect
    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePos({ x, y });
        }
    };

    // Detect when card becomes visible for entry animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`project-card ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
                "--mouse-x": `${mousePos.x}px`,
                "--mouse-y": `${mousePos.y}px`
            }}
        >
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-owner">{owner}</p>
                <p className="card-description">{description}</p>
            </div>

            <div className="card-action">
                <Button
                    size="md"
                    color="white"
                    onClick={() => {
                        if (repoLink) window.open(repoLink, "_blank");
                    }}
                >
                    View the repo
                </Button>
            </div>

            <style jsx>{`
                .project-card {
                    width: 280px;
                    min-height: 400px;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background-color: rgba(0, 0, 0, 0.5);
                    color: var(--color-white);
                    margin: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 1rem;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(5px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    opacity: 0;
                    transform: translateY(30px);
                }
                
                .project-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .project-card.hovered {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
                }
                
                .project-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 12px;
                    background: radial-gradient(
                        circle 100px at var(--mouse-x) var(--mouse-y),
                        rgba(0, 120, 255, 0.15) 0%,
                        transparent 70%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 0;
                }
                
                .project-card.hovered::before {
                    opacity: 1;
                }
                
                .project-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 12px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(255, 255, 255, 0.1) 50%,
                        transparent 100%);
                    background-size: 200% 100%;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .project-card.hovered::after {
                    opacity: 1;
                    animation: shimmer 1.5s infinite;
                }
                
                @keyframes shimmer {
                    0% { background-position: -100% 0; }
                    100% { background-position: 100% 0; }
                }
                
                .card-content {
                    position: relative;
                    z-index: 1;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }
                
                .card-action {
                    position: relative;
                    z-index: 1;
                    margin-top: 1rem;
                }
                
                .card-title {
                    font-family: var(--font-ibm-plex-mono);
                    font-size: 1.5rem;
                    margin: 0;
                    position: relative;
                    display: inline-block;
                    transition: transform 0.3s ease, color 0.3s ease;
                }
                
                .card-title::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: var(--color-blue);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }
                
                .project-card.hovered .card-title {
                    transform: translateY(-2px);
                    color: var(--color-blue);
                }
                
                .project-card.hovered .card-title::after {
                    transform: scaleX(0.7);
                }
                
                .card-owner {
                    font-family: var(--font-roboto);
                    font-weight: bold;
                    margin-top: 2rem;
                    margin-bottom: 0;
                    opacity: 0.8;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                
                .project-card.hovered .card-owner {
                    opacity: 1;
                    transform: translateX(3px);
                }
                
                .card-description {
                    font-family: var(--font-roboto);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin: 2rem 0 0;
                    opacity: 0.8;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                
                .project-card.hovered .card-description {
                    opacity: 1;
                    transform: translateY(-3px);
                }
                
                /* Responsive styles */
                @media (max-width: 768px) {
                    .project-card {
                        width: 100%;
                        max-width: 350px;
                        min-height: 350px;
                    }
                }
                
                @media (max-width: 480px) {
                    .project-card {
                        min-height: 300px;
                        padding: 1.2rem;
                    }
                    
                    .card-title {
                        font-size: 1.3rem;
                    }
                    
                    .card-description {
                        font-size: 0.95rem;
                        margin-top: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}