"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    // Event handlers and component logic
    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setMessage({ text: "Profile updated successfully!", type: "success" });
            setIsLoading(false);

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        }, 1000);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate passwords match
        if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
            setMessage({ text: "New passwords don't match!", type: "error" });
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setMessage({ text: "Password updated successfully!", type: "success" });
            setIsLoading(false);

            // Reset password fields
            setPasswordInfo({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        }, 1000);
    };

    const handleDeleteProject = (projectId) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            setUserProjects(userProjects.filter(project => project.id !== projectId));
            setMessage({ text: "Project deleted successfully!", type: "success" });

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        }
    };

    // States moved below the handler functions
    // Form submission states
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("info");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [currentTheme, setCurrentTheme] = useState('dark'); // Default theme
    const [mounted, setMounted] = useState(false);

    // User information state
    const [userInfo, setUserInfo] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe"
    });

    // Password change state
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // User projects state (mock data for now)
    const [userProjects, setUserProjects] = useState([
        {
            id: "1",
            title: "React Component Library",
            description: "A collection of reusable React components with Tailwind CSS styling.",
            repoLink: "https://github.com/johndoe/react-components"
        },
        {
            id: "2",
            title: "Weather App",
            description: "A weather application built with React that shows current weather conditions and forecasts.",
            repoLink: "https://github.com/johndoe/weather-app"
        }
    ]);

    // Detect theme for dark/light mode styling
    useEffect(() => {
        setMounted(true);
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        setCurrentTheme(theme);

        // Listen for theme changes
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'data-theme') {
                    setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'dark');
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div className={`profile-container ${currentTheme === 'dark' ? 'dark-mode' : ''}`}>
            <h1 className="profile-title">My Profile</h1>

            {/* Message display */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Tab navigation */}
            <div className="tab-navigation">
                <button
                    className={`tab-button ${activeTab === "info" ? "active" : ""}`}
                    onClick={() => setActiveTab("info")}
                >
                    Personal Info
                </button>
                <button
                    className={`tab-button ${activeTab === "password" ? "active" : ""}`}
                    onClick={() => setActiveTab("password")}
                >
                    Change Password
                </button>
                <button
                    className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
                    onClick={() => setActiveTab("projects")}
                >
                    My Projects
                </button>
            </div>

            {/* Personal Info Tab */}
            {activeTab === "info" && (
                <div className="tab-content">
                    <form onSubmit={handleUpdateUserInfo} className="profile-form">
                        <Input
                            label="Full Name"
                            placeholder="Your full name"
                            value={userInfo.name}
                            name="name"
                            onChange={handleUserInfoChange}
                        />
                        <Input
                            label="Email"
                            placeholder="Your email"
                            value={userInfo.email}
                            name="email"
                            type="email"
                            onChange={handleUserInfoChange}
                        />
                        <Input
                            label="Username"
                            placeholder="Your username"
                            value={userInfo.username}
                            name="username"
                            onChange={handleUserInfoChange}
                        />
                        <div className="form-actions">
                            <Button
                                type="submit"
                                color="blue"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Profile"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Password Change Tab */}
            {activeTab === "password" && (
                <div className="tab-content">
                    <form onSubmit={handleUpdatePassword} className="profile-form">
                        <Input
                            label="Current Password"
                            placeholder="Your current password"
                            value={passwordInfo.currentPassword}
                            name="currentPassword"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                        <Input
                            label="New Password"
                            placeholder="Your new password"
                            value={passwordInfo.newPassword}
                            name="newPassword"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                        <Input
                            label="Confirm New Password"
                            placeholder="Confirm your new password"
                            value={passwordInfo.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                        <div className="form-actions">
                            <Button
                                type="submit"
                                color="blue"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
                <div className="tab-content">
                    <div className="projects-header">
                        <h2>My Projects</h2>
                        <Link href="/submit">
                            <Button color="blue" size="sm">Submit New Project</Button>
                        </Link>
                    </div>

                    {userProjects.length === 0 ? (
                        <div className="no-projects">
                            <p>You haven't submitted any projects yet.</p>
                            <Link href="/submit">
                                <Button color="blue">Submit Your First Project</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="projects-grid">
                            {userProjects.map((project) => (
                                <div key={project.id} className="project-wrapper">
                                    <div className="project-card-wrapper">
                                        <ProjectCard
                                            title={project.title}
                                            owner={userInfo.name}
                                            description={project.description}
                                            repoLink={project.repoLink}
                                        />
                                    </div>
                                    <div className="project-actions">
                                        <Button
                                            color="white"
                                            size="sm"
                                            onClick={() => router.push(`/projects?edit=${project.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="black"
                                            size="sm"
                                            onClick={() => handleDeleteProject(project.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
        .profile-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: var(--card-bg);
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(10px);
          animation: fadeIn 0.6s ease-out;
        }
        
        /* Add blue border for dark mode */
        .profile-container.dark-mode {
          border: 2px solid var(--color-blue);
          box-shadow: 0 0 15px rgba(0, 123, 255, 0.3);
        }
        
        .profile-title {
          font-family: var(--font-ibm-plex-mono);
          font-size: 2.5rem;
          color: var(--color-blue);
          margin-bottom: 1.5rem;
          text-align: center;
          position: relative;
        }
        
        .profile-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: var(--color-blue);
          border-radius: 2px;
        }
        
        .message {
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 8px;
          text-align: center;
          font-family: var(--font-ibm-plex-mono);
          animation: slideIn 0.3s ease-out;
        }
        
        .message.success {
          background-color: rgba(0, 255, 0, 0.1);
          border: 1px solid rgba(0, 255, 0, 0.3);
          color: #00cc00;
        }
        
        .message.error {
          background-color: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          color: #ff3333;
        }
        
        .tab-navigation {
          display: flex;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--card-border);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .tab-navigation::-webkit-scrollbar {
          display: none;
        }
        
        .tab-button {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          color: var(--foreground);
          font-family: var(--font-ibm-plex-mono);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }
        
        .tab-button::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--color-blue);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }
        
        .tab-button:hover {
          color: var(--color-blue);
        }
        
        .tab-button.active {
          color: var(--color-blue);
        }
        
        .tab-button.active::after {
          transform: scaleX(1);
        }
        
        .tab-content {
          animation: fadeIn 0.5s ease;
          padding-top: 1rem;
        }
        
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .form-actions {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
        }
        
        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .projects-header h2 {
          font-family: var(--font-ibm-plex-mono);
          color: var(--foreground);
          font-size: 1.5rem;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .project-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .project-card-wrapper {
          width: 100%;
        }
        
        .project-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        
        .no-projects {
          text-align: center;
          padding: 3rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        
        .no-projects p {
          font-family: var(--font-roboto);
          font-size: 1.2rem;
          color: var(--text-gray);
          margin-bottom: 1rem;
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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .profile-container {
            padding: 1.5rem;
            margin: 1rem;
          }
          
          .profile-title {
            font-size: 2rem;
          }
          
          .tab-button {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}