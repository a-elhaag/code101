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

  // Track mouse position for the radial gradient highlight
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
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
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
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
      <div className="photo-container">
        <img src={photo} alt={name} className="profile-photo" />
      </div>

      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-role">{role}</p>
      </div>

      <div className="card-footer">
        {social &&
          Object.keys(social).map((key) => {
            const link = social[key];
            if (!link) return null;
            return (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                {socialIcons[key]}
              </a>
            );
          })}
      </div>

      <style jsx>{`
        .crew-card {
          width: 280px;
          height: 450px; /* Fixed height */
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
          opacity: 0;
          transform: translateY(10px);
          animation: fadeIn 0.6s forwards;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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
        .crew-card.hovered {
          background: radial-gradient(
              circle 80px at var(--mouse-x) var(--mouse-y),
              var(--color-blue) 0%,
              rgba(0, 120, 255, 0.4) 40%,
              transparent 80%
            )
            rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 30px rgba(0, 120, 255, 0.3) inset;
        }
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
        }
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
        .photo-container {
          width: 100%;
          height: 150px;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 1rem;
          position: relative;
          z-index: 2;
        }
        .profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .card-content {
          position: relative;
          z-index: 1;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
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
          margin: 0;
          opacity: 0.9;
        }
        .card-footer {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
        }
        .social-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: background-color 0.3s ease, transform 0.3s ease;
          font-size: 1.8rem;
          color: var(--color-white);
        }
        .social-icon:hover {
          background-color: var(--color-blue);
          transform: scale(1.2);
        }
        /* Responsive styles */
        @media (max-width: 768px) {
          .crew-card {
            width: 100%;
            max-width: 350px;
            min-height: 450px;
          }
        }
        @media (max-width: 480px) {
          .crew-card {
            min-height: 420px;
            padding: 1.2rem;
          }
          .card-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}