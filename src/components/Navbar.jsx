"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const pathname = usePathname(); // Current page path

  // Calculate navbar height after component mounts
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }
  }, []);

  // Helper to set active link color
  const getLinkStyle = (href) => ({
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: "1.2rem",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "color 0.2s ease, opacity 0.2s ease",
    color: pathname === href ? "var(--color-blue)" : "var(--foreground)",
  });

  return (
    <>
      {/* Spacer div using half the navbar height to reduce extra space */}
      <div style={{ height: navHeight * 0.5 }} />

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
          <Link href="/crew" style={getLinkStyle("/crew")}>
            Meet the Crew
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-button ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
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
          <Link
            href="/crew"
            style={getLinkStyle("/crew")}
            onClick={() => setIsOpen(false)}
          >
            Meet the Crew
          </Link>
          <div className="mobile-theme-toggle">
            <ThemeToggle />
          </div>
        </div>

        <style jsx>{`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: var(--card-bg);
            backdrop-filter: blur(10px);
            color: var(--foreground);
            padding: 1.5rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            box-shadow: var(--shadow-sm);
            transition: var(--theme-transition);
          }

          .desktop-links {
            display: flex;
            gap: 1.5rem;
          }
          
          .theme-toggle-container {
            position: absolute;
            right: 6rem;
          }

          .mobile-button {
            background: none;
            border: none;
            color: var(--foreground);
            font-size: 2rem;
            cursor: pointer;
            display: none;
            transition: transform 0.5s ease-in-out;
            position: absolute;
            right: 2rem;
          }

          .mobile-button.open {
            transform: rotate(90deg);
          }

          .mobile-menu {
            position: absolute;
            top: -350px;
            left: 0;
            width: 100%;
            background-color: var(--card-bg);
            padding: 1rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            transition: top 0.5s ease-in-out;
            box-shadow: var(--shadow-md);
          }

          .mobile-menu.open {
            top: 100%;
          }
          
          .mobile-theme-toggle {
            margin-top: 1rem;
            display: none;
          }

          @media (max-width: 767px) {
            .desktop-links, .theme-toggle-container {
              display: none;
            }

            .mobile-button {
              display: block;
            }

            .mobile-menu a {
              font-size: 1.6rem;
              padding: 1rem 0;
            }
            
            .mobile-theme-toggle {
              display: flex;
              justify-content: center;
              margin-bottom: 0.5rem;
            }
          }
        `}</style>
      </nav>
    </>
  );
}