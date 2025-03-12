"use client";
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
    // Initialize with null to avoid hydration mismatch
    const [theme, setTheme] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Only set up the theme after the component has mounted
    useEffect(() => {
        // Mark component as mounted
        setMounted(true);

        // Get current theme from document or default to dark
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(currentTheme);

        // Add listener for theme changes from other sources
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                    setTheme(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        // Update local state
        setTheme(newTheme);

        // Update document
        document.documentElement.setAttribute("data-theme", newTheme);

        // Save preference
        try {
            localStorage.setItem("theme", newTheme);
        } catch (e) {
            console.warn("Could not save theme preference to localStorage", e);
        }
    };

    // Render a placeholder while waiting for hydration
    if (!mounted) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}></div>
        );
    }

    // Full component once mounted
    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === "dark" ? <FaSun /> : <FaMoon />}

            <style jsx>{`
        .theme-toggle {
          background: transparent;
          border: none;
          color: var(--foreground);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .theme-toggle:hover {
          background-color: rgba(0, 120, 255, 0.1); /* Changed from gray to blue with opacity */
          transform: scale(1.1);
        }
        
        .theme-toggle:active {
          transform: scale(0.95);
        }
        
        .theme-toggle::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at center,
            var(--color-blue) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .theme-toggle:hover::after {
          opacity: 0.2;
        }
        
        @media (max-width: 768px) {
          .theme-toggle {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
        }
      `}</style>
        </button>
    );
}
