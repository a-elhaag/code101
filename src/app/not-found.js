"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import NetworkBackground from "@/components/NetworkBackground";

export default function NotFound() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Track mouse position for the radial gradient
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  // Add glitch effect to 404 with interval
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const errorCode = document.querySelector('.error-code');
      if (errorCode) {
        errorCode.classList.add('glitch');
        setTimeout(() => {
          errorCode.classList.remove('glitch');
        }, 200);
      }
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Detect theme for proper styling
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
    <>
      {/* Add the network background */}
      <NetworkBackground color="#007bff" density={15} speed={0.9} />

      <div
        ref={containerRef}
        className="not-found-container"
        onMouseMove={handleMouseMove}
      >
        <div
          className={`content-wrapper ${isHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
          }}
        >
          <h1 className="error-code">4<span className="highlight">0</span>4</h1>
          <div className="underline"></div>
          <h2 className="error-message">Page Not Found</h2>
          <p className="error-description">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="action-buttons">
            <Button
              color={mounted && currentTheme === 'light' ? "black" : "blue"}
              size="lg"
              onClick={() => router.push("/")}
            >
              Return Home
            </Button>
          </div>

          {/* Code lines decoration */}
          <div className="code-decoration">
            <div className="code-line"></div>
            <div className="code-line"></div>
            <div className="code-line"></div>
          </div>
        </div>

        {/* Remove background elements as they are now in the layout */}
        {/* <div className="bg-element el-1"></div>
        <div className="bg-element el-2"></div>
        <div className="bg-element el-3"></div>
        <div className="bg-element el-4"></div> */}

        <style jsx>{`
          .not-found-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;
            background-color: var(--background); /* Use theme variable */
            overflow: hidden;
            position: relative;
            padding: 2rem;
          }
          
          .content-wrapper {
            text-align: center;
            max-width: 600px;
            z-index: 10;
            background: var(--card-bg); /* Use theme variable */
            padding: 3rem;
            border-radius: 20px;
            border: 1px solid var(--card-border); /* Use theme variable */
            box-shadow: var(--shadow-md); /* Use theme variable */
            backdrop-filter: blur(10px);
            animation: fadeIn 0.8s ease-out;
            position: relative;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
          }
          
          /* Hover effects matching other components */
          .content-wrapper.hovered {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg); /* Use theme variable */
            border: 1px solid var(--color-blue-light); /* Use theme variable */
            background: radial-gradient(
              circle 180px at var(--mouse-x) var(--mouse-y),
              rgba(0, 120, 255, 0.15) 0%,
              rgba(0, 120, 255, 0.1) 25%,
              transparent 70%
            ) var(--card-bg); /* Use theme variable */
          }
          
          /* Shimmer effect on hover */
          .content-wrapper.hovered::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 20px;
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
          
          .error-code {
            font-family: var(--font-ibm-plex-mono);
            font-size: 8rem;
            margin: 0;
            line-height: 1;
            color: var(--foreground); /* Use theme variable */
            text-shadow: 0 0 20px rgba(0, 120, 255, 0.3);
            position: relative;
            display: inline-block;
            transition: all 0.3s ease;
          }
          
          /* Glitch effect for the 404 */
          .error-code.glitch {
            animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both;
            text-shadow: 0 0 10px var(--color-blue);
          }
          
          @keyframes glitch {
            0% {
              transform: translate(0);
              opacity: 1;
            }
            20% {
              transform: translate(-4px, 4px);
              opacity: 0.9;
            }
            40% {
              transform: translate(-4px, -4px);
              opacity: 0.8;
            }
            60% {
              transform: translate(4px, 4px);
              opacity: 0.9;
            }
            80% {
              transform: translate(4px, -4px);
              opacity: 1;
            }
            100% {
              transform: translate(0);
              opacity: 1;
            }
          }
          
          .highlight {
            color: var(--color-blue);
            animation: pulse 2s infinite;
            display: inline-block;
          }
          
          @keyframes pulse {
            0% { text-shadow: 0 0 10px rgba(0, 120, 255, 0.2); }
            50% { text-shadow: 0 0 20px rgba(0, 120, 255, 0.8); }
            100% { text-shadow: 0 0 10px rgba(0, 120, 255, 0.2); }
          }
          
          /* Underline effect matching other components */
          .underline {
            height: 3px;
            width: 60px;
            background: linear-gradient(90deg, #0062cc, #007bff, #3a9fff);
            margin: 1rem auto;
            transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .content-wrapper.hovered .underline {
            width: 120px;
          }
          
          .error-message {
            font-family: var(--font-ibm-plex-mono);
            font-size: 2.5rem;
            margin: 1rem 0;
            color: var(--foreground); /* Use theme variable */
            transition: all 0.3s ease;
          }
          
          .content-wrapper.hovered .error-message {
            transform: translateY(-3px);
            color: var(--color-blue);
          }
          
          .error-description {
            font-family: var(--font-roboto);
            font-size: 1.2rem;
            color: var(--foreground); /* Use theme variable */
            opacity: 0.8;
            margin-bottom: 2rem;
            transition: opacity 0.3s ease;
          }
          
          .content-wrapper.hovered .error-description {
            opacity: 1;
          }
          
          .action-buttons {
            margin-top: 2rem;
          }
          
          /* Code-like decoration lines */
          .code-decoration {
            position: absolute;
            bottom: 20px;
            left: 30px;
            opacity: 0.4;
            transition: opacity 0.3s ease;
          }
          
          .content-wrapper.hovered .code-decoration {
            opacity: 0.6;
          }
          
          .code-line {
            height: 2px;
            background-color: var(--color-blue);
            margin: 8px 0;
            transform-origin: left;
          }
          
          .code-line:nth-child(1) {
            width: 60px;
            animation: expandLine 3s infinite;
            animation-delay: 0s;
          }
          
          .code-line:nth-child(2) {
            width: 40px;
            animation: expandLine 3s infinite;
            animation-delay: 0.5s;
          }
          
          .code-line:nth-child(3) {
            width: 80px;
            animation: expandLine 3s infinite;
            animation-delay: 1s;
          }
          
          @keyframes expandLine {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(1.5); }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-15px) translateX(15px);
            }
            50% {
              transform: translateY(0) translateX(30px);
            }
            75% {
              transform: translateY(15px) translateX(15px);
            }
          }

          /* Remove background element styles as they're now in the global style */
          /* .bg-element { ... } */
          
          // ...existing code...
        `}</style>
      </div>
    </>
  );
}
