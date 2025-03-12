"use client";
import React from "react";

export default function LoadingSpinner({ size = "medium", color = "blue" }) {
    // Size variants
    const sizeMap = {
        small: "24px",
        medium: "40px",
        large: "64px",
    };

    // Color variants
    const colorMap = {
        blue: "var(--color-blue)",
        white: "var(--color-white)",
        foreground: "var(--foreground)",
    };

    const spinnerSize = sizeMap[size] || sizeMap.medium;
    const spinnerColor = colorMap[color] || colorMap.blue;

    return (
        <div className="spinner-container">
            <div className="spinner"></div>

            <style jsx>{`
        .spinner-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .spinner {
          width: ${spinnerSize};
          height: ${spinnerSize};
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: ${spinnerColor};
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        [data-theme="light"] .spinner {
          border-color: rgba(0, 0, 0, 0.1);
          border-top-color: ${spinnerColor};
        }
        
        [data-theme="dark"] .spinner {
          border-color: rgba(255, 255, 255, 0.1);
          border-top-color: ${spinnerColor};
        }
      `}</style>
        </div>
    );
}
