"use client";
import React from 'react';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';
import NetworkBackground from "@/components/NetworkBackground";

export default function SubmitProjectPage() {
  return (
    <>
      {/* Add the network background */}
      <NetworkBackground color="#007bff" density={8} speed={0.5} />

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
            animation: slideDown 0.7s ease-out;
          }
          
          .page-heading {
            font-size: 2.5rem;
            font-family: var(--font-ibm-plex-mono);
            margin-bottom: 0.5rem;
          }
          
          .page-subheading {
            font-size: 1.2rem;
            color: var(--foreground);
            opacity: 0.8;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .info-section {
            max-width: 700px;
            margin: 3rem auto 0;
            padding: 2rem;
            border-radius: 16px;
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            box-shadow: var(--shadow-md);
            animation: fadeIn 0.7s ease-out 0.3s both;
          }
          
          .info-section h3 {
            font-family: var(--font-ibm-plex-mono);
            margin-bottom: 1.5rem;
            color: var(--color-blue);
            font-size: 1.5rem;
          }
          
          .info-section ol {
            padding-left: 1.5rem;
            color: var(--foreground);
            opacity: 0.8;
          }
          
          .info-section li {
            margin-bottom: 1rem;
            line-height: 1.6;
            font-size: 1.1rem;
            animation: fadeIn 0.5s ease-out calc(0.5s + var(--i, 0) * 0.1s) both;
          }
          
          .info-section li:nth-child(1) { --i: 1; }
          .info-section li:nth-child(2) { --i: 2; }
          .info-section li:nth-child(3) { --i: 3; }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
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
            
            .info-section {
              padding: 1.5rem;
            }
            
            .info-section li {
              font-size: 1rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}