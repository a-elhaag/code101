"use client";
import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

export default function ProjectCard({ title, owner, description, repoLink }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Track mouse position for the radial gradient
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  // Check if description needs truncation
  useEffect(() => {
    if (descriptionRef.current) {
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsTruncated(isOverflowing);
    }
  }, [description]);

  // Intersection Observer to fade in only when visible
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

  // Detect theme for button color inversion
  useEffect(() => {
    setMounted(true);
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(theme);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(newTheme);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`project-card ${isVisible ? "visible" : ""} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      }}
    >
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-owner">{owner}</p>
        <div className="description-container">
          <p className="card-description" ref={descriptionRef}>
            {description}
          </p>
          {isTruncated && <span className="ellipsis">...</span>}
        </div>
      </div>

      <div className="card-action">
        {/* Invert button color based on theme */}
        <Button
          size="md"
          color={mounted && currentTheme === 'light' ? "black" : "white"}
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
          height: 400px;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid var(--color-blue);
          background-color: var(--card-bg);
          color: var(--foreground);
          margin: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(5px);
          box-shadow: var(--shadow-md);
          cursor: pointer;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeIn 0.6s forwards;
          transition: var(--theme-transition), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Hover effect with theme-aware colors */
        .project-card.hovered {
          background: radial-gradient(
              circle 80px at var(--mouse-x) var(--mouse-y),
              var(--color-blue) 0%,
              rgba(0, 120, 255, 0.4) 40%,
              transparent 80%
            ),
            var(--card-bg);
          box-shadow: 0 0 30px rgba(0, 120, 255, 0.3) inset;
        }
        .project-card.hovered::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
        .card-content {
          position: relative;
          z-index: 1;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        /* Title with underline effect */
        .card-title {
          font-family: var(--font-ibm-plex-mono);
          font-size: 1.5rem;
          margin: 0;
          position: relative;
          display: inline-block;
          transition: transform 0.3s ease, color 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .card-title::after {
          content: "";
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
          transform: scaleX(1);
        }
        .card-owner {
          font-family: var(--font-roboto);
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 0;
          opacity: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-gray);
        }
        .description-container {
          position: relative;
          height: 150px;
          overflow: hidden;
          margin-top: 2rem;
        }
        .card-description {
          font-family: var(--font-roboto);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          opacity: 0.85;
          height: 100%;
          overflow: hidden;
        }
        /* Description gradient fix for light/dark theme */
        .ellipsis {
          position: absolute;
          bottom: 0;
          right: 0;
          color: var(--color-blue);
          font-weight: bold;
          background: linear-gradient(
            to right, 
            transparent, 
            var(--card-bg) 30%, 
            var(--card-bg) 50%
          );
          padding: 0 4px 0 20px;
        }
        /* Centering the button */
        .card-action {
          position: relative;
          z-index: 1;
          margin-top: auto;
          display: flex;
          justify-content: center;
        }
        /* Responsive styles */
        @media (max-width: 768px) {
          .project-card {
            width: 100%;
            max-width: 350px;
            height: 400px;
          }
          .description-container {
            height: 130px;
          }
        }
        @media (max-width: 480px) {
          .project-card {
            height: 380px;
            padding: 1.2rem;
          }
          .card-title {
            font-size: 1.3rem;
          }
          .description-container {
            height: 120px;
            margin-top: 1.5rem;
          }
          .card-description {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}