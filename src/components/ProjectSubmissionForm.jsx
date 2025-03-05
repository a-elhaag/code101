"use client";
import React, { useState } from "react";

export default function ProjectSubmissionForm() {
    // Changed variable names to match the API expectations (snake_case)
    const [project_name, setProjectName] = useState("");
    const [github_link, setRepoLink] = useState("");
    const [owner_name, setTeamOwner] = useState("");
    const [description, setDescription] = useState("");
    const [whatsapp_contact, setContactInfo] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);

        try {
            // Updated to use the correct API endpoint path
            const res = await fetch("/api/submit-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    project_name,         // Changed to match API expectations
                    github_link,          // Changed to match API expectations
                    owner_name,           // Changed to match API expectations
                    description,
                    whatsapp_contact      // Changed to match API expectations
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Submission successful! Your project will be reviewed.");
                // Reset the form fields
                setProjectName("");
                setRepoLink("");
                setTeamOwner("");
                setDescription("");
                setContactInfo("");
            } else {
                throw new Error(data.message || data.error || "Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Submission failed: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="submission-form">
            <h2>Submit Your Project</h2>
            <div className="form-field">
                <label>Project Name</label>
                <input
                    type="text"
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                    required
                />
            </div>
            <div className="form-field">
                <label>GitHub Repo Link</label>
                <input
                    type="url"
                    value={github_link}
                    onChange={(e) => setRepoLink(e.target.value)}
                    placeholder="https://github.com/your-repo"
                    required
                />
            </div>
            <div className="form-field">
                <label>Team / Project Owner</label>
                <input
                    type="text"
                    value={owner_name}
                    onChange={(e) => setTeamOwner(e.target.value)}
                    placeholder="Team or Owner Name"
                    required
                />
            </div>
            <div className="form-field">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project"
                    required
                />
            </div>
            <div className="form-field">
                <label>Contact (WhatsApp Number)</label>
                <input
                    type="tel"
                    value={whatsapp_contact}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="+1234567890"
                    required
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Project"}
            </button>
            {message && (
                <p className={`feedback ${message.includes("success") ? "success" : "error"}`}>
                    {message}
                </p>
            )}
            <style jsx>{`
        .submission-form {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--color-white);
          font-family: var(--font-roboto);
        }
        .submission-form h2 {
          font-family: var(--font-ibm-plex-mono);
          font-size: 2rem;
          text-align: center;
          margin-bottom: 1rem;
          position: relative;
        }
        .submission-form h2::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 100px;
          height: 2px;
          background-color: var(--color-blue);
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .submission-form h2:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-field label {
          font-size: 1.1rem;
        }
        .form-field input,
        .form-field textarea {
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background-color: rgba(0, 0, 0, 0.5);
          color: var(--color-white);
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .form-field input:focus,
        .form-field textarea:focus {
          border-color: var(--color-blue);
          box-shadow: 0 0 15px rgba(0, 120, 255, 0.3);
        }
        button {
          padding: 1rem 2rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 8px;
          background-color: var(--color-blue);
          color: var(--color-white);
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: rgba(0, 120, 255, 0.8);
        }
        .feedback {
          text-align: center;
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 6px;
        }
        
        .feedback.success {
          background-color: rgba(0, 255, 0, 0.1);
          color: #00ff00;
        }
        
        .feedback.error {
          background-color: rgba(255, 0, 0, 0.1);
          color: #ff5555;
        }
      `}</style>
        </form>
    );
}