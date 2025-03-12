"use client";
import React from "react";
import CrewCard from "@/components/CrewCard";
import crewData from "@/data/crew";

export default function MeetTheCrew() {
  return (
    <>

      <div className="crew-page">
        <h1 className="page-heading">Meet the Crew</h1>
        <div className="crew-grid">
          {crewData.map((member, index) => (
            <CrewCard key={index} {...member} />
          ))}
        </div>

        {/* Remove background elements */}
      </div>

      <style jsx>{`
        .crew-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .crew-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          position: relative;
          z-index: 1;
        }

        /* Remove background element styles */
      `}</style>
    </>
  );
}