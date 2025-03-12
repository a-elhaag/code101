"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaTwitter, FaGithub, FaLinkedin, FaInstagram,
  FaMedium, FaYoutube, FaFacebook, FaGlobe
} from "react-icons/fa";

export default function CrewCard({ photo, name, role, bio, social }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Track mouse position for the radial gradient highlight
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Intersection Observer to fade in when the card becomes visible
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
      observer.disconnect();
    };
  }, []);

  // Detect theme for social icon colors
  useEffect(() => {
    setMounted(true);
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(theme);

    const observer = new MutationObserver(() => {
      setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Define social icons mapping matching the footer style
  const socialIcons = {
    twitter: <FaTwitter />,
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    instagram: <FaInstagram />,
    medium: <FaMedium />,
    youtube: <FaYoutube />,
    facebook: <FaFacebook />,
    website: <FaGlobe />,
  };

  return (
    <div
      ref={cardRef}
      className={`crew-card ${isVisible ? "visible" : ""} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      }}
    >
      <div className="card-content">
        <div className="photo-container">
          <img src={photo} alt={name} className="profile-photo" />
        </div>
        <h2 className="card-title">{name}</h2>
        <p className="card-role">{role}</p>
        {bio && <p className="card-bio">{bio}</p>}
      </div>

      <div className="card-footer">
        {social &&
          Object.keys(social).map((key) => {
            const link = social[key];
            const Icon = socialIcons[key] || null;
            if (!link || !Icon) return null;
            return (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                {Icon}
              </a>
            );
          })}
      </div>

      <style jsx>{`
        .crew-card {
          width: 280px;
          height: 450px;
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
        
        .crew-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Hover effect with theme-aware colors matching ProjectCard */
        .crew-card.hovered {
          background: radial-gradient(
              circle 80px at var(--mouse-x) var(--mouse-y),
              var(--color-blue) 0%,
              rgba(0, 120, 255, 0.4) 40%,
              transparent 80%
            ),
            var(--card-bg);
          box-shadow: 0 0 30px rgba(0, 120, 255, 0.3) inset;
          transform: translateY(-5px);
        }
        
        /* Shimmer effect matching ProjectCard */
        .crew-card.hovered::after {
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
          pointer-events: none;
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
        
        /* Fixing photo size */
        .photo-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 2px solid var(--color-blue);
        }
        
        .profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .crew-card.hovered .profile-photo {
          transform: scale(1.05);
        }
        
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
        
        .crew-card.hovered .card-title {
          transform: translateY(-2px);
          color: var(--color-blue);
        }
        
        .crew-card.hovered .card-title::after {
          transform: scaleX(1);
        }
        
        .card-role {
          font-family: var(--font-roboto);
          font-weight: bold;
          margin: 0.5rem 0 0.7rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-gray);
        }
        
        .card-bio {
          font-family: var(--font-roboto);
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
          flex-grow: 1;
          opacity: 0.85;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        
        .card-footer {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--card-border);
          position: relative;
          z-index: 2;
        }
        
        .social-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          font-size: 1.1rem;
          color: var(--foreground);
        }
        
        .social-icon:hover {
          background-color: var(--color-blue);
          transform: scale(1.2);
          color: var(--color-white);
        }
        
        @media (max-width: 768px) {
          .crew-card {
            width: 100%;
            max-width: 350px;
            height: 400px;
          }
          
          .photo-container {
            width: 100px;
            height: 100px;
          }
        }
        
        @media (max-width: 480px) {
          .crew-card {
            height: 380px;
            padding: 1.2rem;
          }
          
          .card-title {
            font-size: 1.3rem;
          }
          
          .photo-container {
            width: 90px;
            height: 90px;
          }
        }
      `}</style>
    </div>
  );
}