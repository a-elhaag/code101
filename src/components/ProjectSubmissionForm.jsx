"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function ProjectSubmissionForm() {
  // Form data state (using snake_case to match API expectations)
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
      const res = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name,
          github_link,
          owner_name,
          description,
          whatsapp_contact
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
      {/* Removed form title */}
      <div className="form-field">
        <Input
          label="Project Name"
          name="project_name"
          value={project_name}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          required
        />
      </div>
      <div className="form-field">
        <Input
          label="GitHub Repo Link"
          name="github_link"
          value={github_link}
          onChange={(e) => setRepoLink(e.target.value)}
          placeholder="https://github.com/your-repo"
          type="url"
          required
        />
      </div>
      <div className="form-field">
        <Input
          label="Team / Project Owner"
          name="owner_name"
          value={owner_name}
          onChange={(e) => setTeamOwner(e.target.value)}
          placeholder="Team or Owner Name"
          required
        />
      </div>
      <div className="form-field">
        <Input
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project (max 80 chars)"
          required
        />
      </div>
      <div className="form-field">
        <Input
          label="WhatsApp Contact"
          name="whatsapp_contact"
          value={whatsapp_contact}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder="+1234567890"
          type="tel"
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Project"}
      </button>
      {message && (
        <p className={`feedback ${message.includes("successful") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      <style jsx>{`
        .submission-form {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: var(--card-bg);
          border-radius: 12px;
          border: 1px solid var(--card-border);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--foreground);
          font-family: var(--font-roboto);
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-field label {
          font-size: 1.1rem;
        }
        /* Input component is assumed to have its own styling */
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
          background-color: var(--color-blue-light);
        }
        .feedback {
          text-align: center;
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 6px;
        }
        .feedback.success {
          background-color: rgba(0, 120, 255, 0.1);
          color: var(--color-blue);
          border: 1px solid var(--color-blue-light);
        }
        .feedback.error {
          background-color: rgba(255, 0, 0, 0.1);
          color: #ff5555;
          border: 1px solid rgba(255, 0, 0, 0.2);
        }
      `}</style>
    </form>
  );
}