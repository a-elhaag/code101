"use client";
import React, { useState } from "react";

const Button = ({ size = "md", color = "blue", children, onClick }) => {
    // Local state to track hover
    const [isHovered, setIsHovered] = useState(false);

    // Base styles applied to all buttons
    const baseStyles = {
        borderRadius: "6px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        fontFamily: "var(--font-ibm-plex-mono)", // or var(--font-roboto) if desired
    };

    // Size variants
    const sizeStyles = {
        lg: { padding: "12px 24px", fontSize: "18px" },
        md: { padding: "10px 20px", fontSize: "16px" },
        sm: { padding: "8px 16px", fontSize: "14px" },
    };

    // Default color styles
    const colorStyles = {
        black: {
            backgroundColor: "var(--color-black)",
            color: "var(--color-white)",
            border: "1px solid var(--color-white)",
        },
        white: {
            backgroundColor: "var(--color-white)",
            color: "var(--color-black)",
            border: "1px solid var(--color-black)",
        },
        blue: {
            backgroundColor: "var(--color-blue)",
            color: "var(--color-white)",
            border: "1px solid var(--color-blue)",
        },
    };

    // Hover styles for each color
    const hoverStyles = {
        black: { backgroundColor: "var(--color-gray)" }, // black → gray
        white: { opacity: "0.5" }, // slightly fade
        blue: { opacity: "0.8" },  // slightly fade
    };

    // Combine all styles: base + size + color + (optional hover)
    const buttonStyle = {
        ...baseStyles,
        ...sizeStyles[size],
        ...colorStyles[color],
        ...(isHovered ? hoverStyles[color] : {}),
    };

    return (
        <button
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;