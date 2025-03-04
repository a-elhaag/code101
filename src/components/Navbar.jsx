"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Current page path

  // Helper to set active link color
  const getLinkStyle = (href) => ({
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: "1.2rem",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "color 0.2s ease, opacity 0.2s ease",
    color: pathname === href ? "var(--color-blue)" : "var(--color-white)",
  });

  return (
    <nav className="navbar">
      {/* Desktop Navigation */}
      <div className="desktop-links">
        <Link href="/" style={getLinkStyle("/")}>
          Home
        </Link>
        <Link href="/about" style={getLinkStyle("/about")}>
          About
        </Link>
        <Link href="/projects" style={getLinkStyle("/projects")}>
          Projects
        </Link>
        <Link href="/submit" style={getLinkStyle("/submit")}>
          Submit a Project
        </Link>
        <Link href="/crew" style={getLinkStyle("/submit")}>
          Meet the Crew
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`mobile-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link href="/" style={getLinkStyle("/")} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link
          href="/about"
          style={getLinkStyle("/about")}
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          href="/projects"
          style={getLinkStyle("/projects")}
          onClick={() => setIsOpen(false)}
        >
          Projects
        </Link>
        <Link
          href="/submit"
          style={getLinkStyle("/submit")}
          onClick={() => setIsOpen(false)}
        >
          Submit
        </Link>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed; /* Fixed so it stays in place on scroll */
          top: 0;
          left: 0;
          width: 100%;
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 1.5rem 0; /* Enlarged padding */
          margin-bottom: 1.3rem; /* Add margin-bottom so content isn't too close */
          /* Removed bottom border */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        /* Desktop navigation (default) */
        .desktop-links {
          display: flex;
          gap: 1.5rem;
        }

        /* Mobile button is hidden by default on desktop */
        .mobile-button {
          position: center;
          right: 2rem;
          background: none;
          border: none;
          color: var(--color-white);
          font-size: 2rem; /* Larger button on mobile */
          cursor: pointer;
          display: none; /* hide on desktop */
          transition: transform 0.5s ease-in-out; /* Smoother transition */
        }

        /* Rotate the button slightly when open (optional flair) */
        .mobile-button.open {
          transform: rotate(90deg);
        }

        /* Mobile menu is hidden by default */
        .mobile-menu {
          position: absolute;
          top: -350px; /* Hidden off-screen */
          left: 0;
          width: 100%;
          background-color: var(--color-black);
          padding: 1rem 0; /* More vertical space */
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: top 0.5s ease-in-out; /* Smoother animation */
        }

        /* Mobile menu when open */
        .mobile-menu.open {
          top: 100%;
        }

        /* Screen width < 768px => hide desktop links, show mobile button */
        @media (max-width: 767px) {
          .desktop-links {
            display: none; /* hide on mobile */
          }

          .mobile-button {
            display: block; /* show on mobile */
          }

          /* Increase font sizes/padding for better mobile UX */
          .mobile-menu a {
            font-size: 4xrem; /* larger link text */
          }
        }
      `}</style>
    </nav>
  );
}