"use client";
import React from 'react';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';

export default function SubmitProjectPage() {
    return (
        <div className="submit-page">
            <div className="page-header">
                <h1 className="page-heading">Submit Your Project</h1>
                <p className="page-subheading">
                    Share your work with the Code101 community
                </p>
            </div>

            <ProjectSubmissionForm />

            <div className="info-section">
                <h3>What happens next?</h3>
                <ol>
                    <li>Our team will review your project submission</li>
                    <li>If approved, your project will appear on our Projects page</li>
                    <li>We may contact you via WhatsApp if we have any questions</li>
                </ol>
            </div>

            <style jsx>{`
        .submit-page {
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeIn 0.5s ease-out;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .page-heading {
          font-size: 2.5rem;
          background: linear-gradient(to right, #fff, var(--color-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .page-subheading {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .info-section {
          max-width: 700px;
          margin: 3rem auto 0;
          padding: 1.5rem;
          border-radius: 12px;
          background-color: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .info-section h3 {
          font-family: var(--font-ibm-plex-mono);
          margin-bottom: 1rem;
          color: var(--color-blue);
        }
        
        .info-section ol {
          padding-left: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .info-section li {
          margin-bottom: 0.5rem;
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
        
        @media (max-width: 768px) {
          .page-heading {
            font-size: 2rem;
          }
          
          .page-subheading {
            font-size: 1rem;
          }
        }
      `}</style>
        </div>
    );
}