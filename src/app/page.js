"use client";
import { useRef, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import Table from "@/components/Table";
import FAQ from "@/components/FAQ";

export default function Home() {
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Simple background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Adjust dot count based on screen size for better performance on mobile
    const isMobile = window.innerWidth < 768;
    const dotCount = isMobile ? 15 : 30; // Fewer dots on mobile
    const dots = [];

    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    // Simple animation function
    const render = () => {
      // Clear with fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update dots
      dots.forEach(dot => {
        // Move dot
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // Wrap around edges
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();

        // Draw connection lines between nearby dots
        // Use a smaller connection distance on mobile
        const connectionDistance = isMobile ? 100 : 150;

        dots.forEach(otherDot => {
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.strokeStyle = `rgba(100, 180, 255, ${0.1 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <section className="hero-section">
        <canvas ref={canvasRef} className="bg-canvas" />

        <div className="hero-content">
          <h1>
            Code<span className="highlight">1</span>0<span className="highlight">1</span>
          </h1>
          <p>Learn<span className="white">.</span> Build<span className="white">.</span> Share<span className="white">.</span></p>
        </div>

        <button className="scroll-arrow" onClick={scrollToContent} aria-label="Scroll to content">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      <div ref={contentRef}>
        {/* Add the Table component here */}
        <Table />
        <FAQ />
      </div>

      <main className="project-grid">
        <ProjectCard
          title="Awesome Project"
          owner="Jane Doe"
          description="A cool open-source project for Code101."
          repoLink="https://github.com/username/repo"
        />
        <ProjectCard
          title="Another Project"
          owner="Team Code101"
          description="Collaboration is the key!"
          repoLink="https://github.com/another/repo"
        />
      </main>

      <style jsx>{`
        .hero-section {
          position: relative;
          height: 80vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: black;
        }
        
        .bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .hero-content {
          text-align: center;
          color: white;
          z-index: 1;
          padding: 2rem;
          width: 100%;
          max-width: 1200px;
        }
        
        .hero-content h1 {
          font-size: 7rem;
          margin-bottom: 1rem;
          font-family: var(--font-ibm-plex-mono);
          letter-spacing: -0.05em;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          animation: fadeIn 1.2s ease-out;
        }
        
        .highlight {
          color: var(--color-blue);
          // text-shadow: 0 0 20px rgba(0, 150, 255, 0.7);
        }
        
        .white {
          color: var(--color-white);
        }
        
        .hero-content p {
          font-size: 1.8rem;
          color: var(--color-blue);
          opacity: 0.9;
          margin-top: 0.5rem;
          font-weight: 300;
          animation: fadeIn 1.2s ease-out 0.3s both;
        }
        
        .scroll-arrow {
          position: absolute;
          bottom: 2rem;
          cursor: pointer;
          animation: bounce 2s infinite;
          z-index: 2;
          background: none;
          border: none;
          color: white;
          padding: 1rem;
        }
        
        .project-grid {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding: 3rem 1.5rem;
          justify-content: center;
          background-color: black;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
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
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 4rem;
            margin-bottom: 0.5rem;
          }
          
          .hero-content p {
            font-size: 1.2rem;
          }
          
          .project-grid {
            padding: 2rem 1rem;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 3.5rem;
          }
          
          .hero-content p {
            font-size: 1rem;
            padding: 0 0.5rem;
          }
          
          .hero-section {
            height: 70vh;
          }
          
          .scroll-arrow svg {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
}