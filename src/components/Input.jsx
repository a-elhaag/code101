"use client";
import React, { useState, useRef } from "react";

export default function Input({ label, placeholder, value, onChange }) {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef(null);

    return (
        <div 
            className={`input-container ${isFocused ? "focused" : ""} ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {label && <label className="input-label">{label}</label>}
            <input
                ref={inputRef}
                className="styled-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <style jsx>{`
        .input-container {
          width: 100%;
          max-width: 400px;
          margin: 1rem auto;
          position: relative;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeIn 0.6s forwards;
          transition: all 0.3s ease;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .input-label {
          font-family: var(--font-ibm-plex-mono);
          font-size: 1.1rem;
          color: var(--color-white);
          margin-bottom: 0.5rem;
          position: relative;
          display: inline-block;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        
        .input-label::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .input-container.focused .input-label,
        .input-container.hovered .input-label {
          color: var(--color-blue);
        }
        
        .input-container.focused .input-label {
          transform: translateY(-2px);
        }
        
        .input-container.focused .input-label::after,
        .input-container.hovered .input-label::after {
          transform: scaleX(1);
        }
        
        .styled-input {
          font-family: var(--font-roboto);
          font-size: 1rem;
          padding: 0.8rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background-color: rgba(0, 0, 0, 0.5);
          color: var(--color-white);
          outline: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        
        .input-container.hovered .styled-input {
          border-color: rgba(0, 120, 255, 0.5);
          box-shadow: 0 0 15px rgba(0, 120, 255, 0.1);
          background-color: rgba(0, 20, 40, 0.4);
        }
        
        .styled-input:focus {
          border-color: var(--color-blue);
          box-shadow: 0 0 15px rgba(0, 120, 255, 0.3);
          transform: translateY(-1px);
        }
        
        /* Shimmer effect on hover */
        .input-container.hovered::after {
          content: "";
          position: absolute;
          top: 24px; /* Adjust based on label height */
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          z-index: 1;
        }
        
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        
        ::placeholder {
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s ease;
        }
        
        .input-container.hovered ::placeholder {
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
        </div>
    );
}