"use client";
import React from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaMedium, FaYoutube, FaFacebook, FaGlobe } from "react-icons/fa";

export default function Footer({
  iconSrc = "/code101-logo.svg",
  socialLinks = {
    twitter: "",
    github: "",
    linkedin: "https://www.linkedin.com/company/code101xyz/",
    instagram: "https://www.instagram.com/code_101?igsh=a2ptdDlmOHloajR1",
    medium: "",
    youtube: "",
    facebook: "",
    website: "",
  },
}) {
  // Filter out empty links
  const availableSocialLinks = Object.entries(socialLinks).filter(
    ([, url]) => url && url.trim() !== ""
  );

  // Map each platform to a React Icon - added FaGlobe for website
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
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <img src="/logo.svg" alt="Code101 Logo" className="footer-logo" />
        </div>

        {/* Center: Social Media Icons */}
        <div className="footer-center">
          {availableSocialLinks.map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {socialIcons[platform]}
            </a>
          ))}
        </div>

        {/* Right: Legal Links */}
        <div className="footer-right">
          <a className="footer-link">
            &copy; 2025 Code101
          </a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background: #000;
          color: var(--color-white);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
        }

        .footer-content {
          width: 100%;
          max-width: 1400px;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          align-items: center;
          gap: 2.5rem;
        }

        .footer-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .footer-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }

        .footer-center {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.5rem;
        }

        .social-link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: background-color 0.3s ease, transform 0.3s ease;
          font-size: 1.8rem;
        }

        .social-link:hover {
          background-color: var(--color-blue);
          transform: scale(1.2);
          color: var(--color-white);
        }

        .footer-link {
          font-family: var(--font-ibm-plex-mono);
          font-size: 1.1rem;
          text-decoration: none;
          color: var(--color-white);
          transition: color 0.3s ease, border-bottom 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .footer-link:hover {
          color: var(--color-blue);
          border-bottom: 1px solid var(--color-blue);
        }

        @media (max-width: 767px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-left,
          .footer-center,
          .footer-right {
            justify-content: center;
          }
          .footer-right {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}