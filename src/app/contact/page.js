"use client";
import React from "react";

export default function Contact() {
    return (
        <div className="contact-page">
            <header className="header">
                <h1 className="heading">
                    Contact Code<span className="highlight">101</span>
                </h1>
            </header>
            <section className="content">
                <p>
                    We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
                </p>
                <div className="contact-info">
                    <div className="info-box">
                        <h3>Other Ways to Connect</h3>
                        <ul>
                            <li><strong>Email:</strong> team@code101.xyz</li>
                            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/code101xyz/">Code101 on LinkedIn</a></li>
                            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/code_101?igsh=a2ptdDlmOHloajR1">Code101 on Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .contact-page {
          padding: 3rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          color: var(--color-white);
          background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border: 2px solid var(--color-blue);
          border-radius: 16px;
        }
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .heading {
          font-family: var(--font-ibm-plex-mono);
          font-size: 3rem;
          background: linear-gradient(135deg, #4dabff, #007bff);
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
        .contact-info {
          margin-top: 2rem;
        }
        .info-box {
          background: rgba(0, 0, 0, 0.5);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .info-box h3 {
          font-family: var(--font-ibm-plex-mono);
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .info-box ul {
          list-style: none;
          padding: 0;
        }
        .info-box li {
          margin-bottom: 0.5rem;
        }
        .info-box a {
          color: var(--color-blue);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .info-box a:hover {
          color: var(--color-white);
        }
      `}</style>
        </div>
    );
}