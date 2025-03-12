"use client";
import React from "react";
import NetworkBackground from "@/components/NetworkBackground";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="aboutPage">
        <header className="header">
          <h1 className="heading">
            About Code<span className="highlight">101</span>
          </h1>
        </header>
        <section className="content">
          <p>
            Welcome to Code<span className="highlight">101</span>—your friendly hub where developers of all levels come together to learn, build, and share. We&apos;re here to empower you to grow your skills, experiment with new ideas, and collaborate with an amazing community.
          </p>
          <p>
            At Code<span className="highlight">101</span>, we believe that learning should be fun and that every project is a chance to create something awesome. Our three pillars—<span className="highlight">Learn</span>, <span className="highlight">Build</span>, and <span className="highlight">Share</span>—aren&apos;t just words; they&apos;re the heart and soul of our community.
          </p>
          <p>
            We&apos;re passionate about open‑source collaboration and work together to turn innovative ideas into real‑world projects. Here, every contribution is celebrated, and every voice is heard. Whether you&apos;re just starting out or a seasoned developer, you&apos;ll find support, friendly advice, and plenty of inspiration.
          </p>
          <p>
            Our journey started with a simple vision—to create a warm, welcoming space where knowledge flows freely and creativity thrives. Today, we continue to evolve our platform, always staying true to our values of transparency, collaboration, and genuine support.
          </p>
        </section>

        <style jsx>{`
          .about-page {
            padding: 0 1rem;
          }
          .aboutPage {
            padding: 3rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
            color: var(--foreground);
            background: var(--gradient-bg);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            border: 2px solid var(--color-blue);
            border-radius: 16px;
            box-shadow: var(--shadow-md);
          }
          .header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .heading {
            font-family: var(--font-ibm-plex-mono);
            font-size: 3rem;
            background: var(--gradient-text);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
          }
          .highlight {
            color: var(--color-blue);
            font-weight: 600;
          }
          .content {
            font-family: var(--font-roboto);
            font-size: 1.25rem;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
          }
          .content p {
            margin-bottom: 1.5rem;
          }

          @media (max-width: 768px) {
            .aboutPage {
              max-width: 90%;
              padding: 2rem 1rem;
            }

            .content {
              font-size: 1rem;
              max-width: 100%;
            }

            .heading {
              font-size: 2rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
}