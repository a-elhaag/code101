"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

export default function AdminPage() {
    // States for admin functionality
    const [activeTab, setActiveTab] = useState("users");
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [currentTheme, setCurrentTheme] = useState("dark");
    const [isLoading, setIsLoading] = useState(false);

    // User management states
    const [users, setUsers] = useState([
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            username: "johndoe",
            role: "user",
            accountStatus: "active",
            joinDate: "2023-03-15"
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            username: "janesmith",
            role: "user",
            accountStatus: "active",
            joinDate: "2023-04-20"
        },
        {
            id: "3",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            username: "bobjohnson",
            role: "admin",
            accountStatus: "active",
            joinDate: "2023-02-10"
        }
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        username: "",
        role: "user",
        accountStatus: "active"
    });

    // Project management states
    const [projects, setProjects] = useState([
        {
            id: "1",
            title: "React Component Library",
            description: "A collection of reusable React components with Tailwind CSS styling.",
            submittedBy: "1",
            submitterName: "John Doe",
            submissionDate: "2023-05-20",
            status: "pending",
            repoLink: "https://github.com/johndoe/react-components"
        },
        {
            id: "2",
            title: "Weather App",
            description: "A weather application built with React that shows current weather conditions and forecasts.",
            submittedBy: "2",
            submitterName: "Jane Smith",
            submissionDate: "2023-06-15",
            status: "approved",
            repoLink: "https://github.com/janesmith/weather-app"
        },
        {
            id: "3",
            title: "Task Management API",
            description: "RESTful API for managing tasks and projects with user authentication.",
            submittedBy: "1",
            submitterName: "John Doe",
            submissionDate: "2023-07-10",
            status: "declined",
            repoLink: "https://github.com/johndoe/task-api"
        }
    ]);

    // Filter states
    const [userFilter, setUserFilter] = useState("all");
    const [projectFilter, setProjectFilter] = useState("all");

    // Detect theme for dark/light mode styling
    useEffect(() => {
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

    // Filter users based on search term and filter
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase());

        if (userFilter === "all") return matchesSearch;
        if (userFilter === "admin") return matchesSearch && user.role === "admin";
        if (userFilter === "user") return matchesSearch && user.role === "user";
        if (userFilter === "active") return matchesSearch && user.accountStatus === "active";
        if (userFilter === "inactive") return matchesSearch && user.accountStatus === "inactive";

        return matchesSearch;
    });

    // Filter projects based on search term and filter
    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.submitterName.toLowerCase().includes(searchTerm.toLowerCase());

        if (projectFilter === "all") return matchesSearch;
        if (projectFilter === "pending") return matchesSearch && project.status === "pending";
        if (projectFilter === "approved") return matchesSearch && project.status === "approved";
        if (projectFilter === "declined") return matchesSearch && project.status === "declined";

        return matchesSearch;
    });

    // Handle selecting a user to edit
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setUserFormData({
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            accountStatus: user.accountStatus
        });
    };

    // Handle user form data changes
    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle updating user information
    const handleUpdateUser = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to update user
        setTimeout(() => {
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, ...userFormData }
                    : user
            ));

            setMessage({ text: "User updated successfully!", type: "success" });
            setIsLoading(false);
            setSelectedUser(null);

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        }, 1000);
    };

    // Handle resetting user password
    const handleResetPassword = (userId) => {
        setIsLoading(true);

        // Simulate API call to reset password
        setTimeout(() => {
            setMessage({ text: "Password reset email sent successfully!", type: "success" });
            setIsLoading(false);

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        }, 1000);
    };

    // Handle changing project status
    const handleProjectStatusChange = (projectId, newStatus) => {
        setIsLoading(true);

        // Simulate API call to update project status
        setTimeout(() => {
            setProjects(projects.map(project =>
                project.id === projectId
                    ? { ...project, status: newStatus }
                    : project
            ));

            setMessage({
                text: `Project ${newStatus === "approved" ? "approved" : "declined"} successfully!`,
                type: "success"
            });
            setIsLoading(false);

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        }, 1000);
    };

    // Display helper function for status badges
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "approved": return "status-badge approved";
            case "pending": return "status-badge pending";
            case "declined": return "status-badge declined";
            case "active": return "status-badge active";
            case "inactive": return "status-badge inactive";
            default: return "status-badge";
        }
    };

    return (
        <div className={`admin-container ${currentTheme === 'dark' ? 'dark-mode' : ''}`}>
            <div className="admin-header">
                <h1 className="admin-title">Admin Dashboard</h1>
                <div className="admin-subtitle">Manage users and projects</div>
            </div>

            {/* Message display */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    <div className="message-content">
                        {message.text}
                    </div>
                </div>
            )}

            {/* Tab navigation */}
            <div className="tab-navigation">
                <button
                    className={`tab-button ${activeTab === "users" ? "active" : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    <span className="tab-icon">👥</span>
                    User Management
                </button>
                <button
                    className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
                    onClick={() => setActiveTab("projects")}
                >
                    <span className="tab-icon">📁</span>
                    Project Approval
                </button>
            </div>

            {/* Search and filter bar */}
            <div className="dashboard-controls">
                <div className="control-panel">
                    <div className="search-bar">
                        <Input
                            placeholder={`Search ${activeTab === "users" ? "users" : "projects"}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon="🔍"
                        />
                    </div>

                    <div className="filter-options">
                        {activeTab === "users" && (
                            <select
                                value={userFilter}
                                onChange={(e) => setUserFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Users</option>
                                <option value="admin">Admins Only</option>
                                <option value="user">Regular Users</option>
                                <option value="active">Active Accounts</option>
                                <option value="inactive">Inactive Accounts</option>
                            </select>
                        )}

                        {activeTab === "projects" && (
                            <select
                                value={projectFilter}
                                onChange={(e) => setProjectFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Projects</option>
                                <option value="pending">Pending Review</option>
                                <option value="approved">Approved</option>
                                <option value="declined">Declined</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className="stats-panel">
                    {activeTab === "users" && (
                        <>
                            <div className="stat-box">
                                <div className="stat-value">{users.length}</div>
                                <div className="stat-label">Total Users</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">{users.filter(u => u.role === "admin").length}</div>
                                <div className="stat-label">Admins</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">{users.filter(u => u.accountStatus === "active").length}</div>
                                <div className="stat-label">Active</div>
                            </div>
                        </>
                    )}

                    {activeTab === "projects" && (
                        <>
                            <div className="stat-box">
                                <div className="stat-value">{projects.length}</div>
                                <div className="stat-label">Total Projects</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">{projects.filter(p => p.status === "pending").length}</div>
                                <div className="stat-label">Pending</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">{projects.filter(p => p.status === "approved").length}</div>
                                <div className="stat-label">Approved</div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* User Management Tab */}
            {activeTab === "users" && (
                <div className="tab-content">
                    <div className="content-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">User Accounts</h2>
                            <div className="panel-actions">
                                <Button color="blue" size="sm">Add New User</Button>
                            </div>
                        </div>

                        <div className="users-section">
                            <div className="data-table">
                                <div className="table-header">
                                    <div className="header-cell name-cell">Name</div>
                                    <div className="header-cell email-cell">Email</div>
                                    <div className="header-cell role-cell">Role</div>
                                    <div className="header-cell status-cell">Status</div>
                                    <div className="header-cell date-cell">Joined</div>
                                    <div className="header-cell actions-cell">Actions</div>
                                </div>

                                {filteredUsers.length === 0 ? (
                                    <div className="no-results">
                                        <div className="no-results-icon">🔍</div>
                                        <div className="no-results-text">No users found matching your criteria</div>
                                    </div>
                                ) : (
                                    <div className="table-body">
                                        {filteredUsers.map(user => (
                                            <div key={user.id} className="table-row">
                                                <div className="table-cell name-cell">
                                                    <div className="user-avatar">{user.name.charAt(0)}</div>
                                                    <div className="user-name">{user.name}</div>
                                                </div>
                                                <div className="table-cell email-cell">{user.email}</div>
                                                <div className="table-cell role-cell">
                                                    <span className={`role-badge ${user.role}`}>
                                                        {user.role === "admin" ? "Admin" : "User"}
                                                    </span>
                                                </div>
                                                <div className="table-cell status-cell">
                                                    <span className={getStatusBadgeClass(user.accountStatus)}>
                                                        {user.accountStatus.charAt(0).toUpperCase() + user.accountStatus.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="table-cell date-cell">
                                                    {new Date(user.joinDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="table-cell actions-cell">
                                                    <div className="action-buttons">
                                                        <Button
                                                            color="blue"
                                                            size="sm"
                                                            onClick={() => handleSelectUser(user)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            color="black"
                                                            size="sm"
                                                            onClick={() => handleResetPassword(user.id)}
                                                        >
                                                            Reset
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {selectedUser && (
                                <div className="user-edit-panel">
                                    <div className="panel-scroll-container">
                                        <div className="panel-header">
                                            <h3 className="edit-title">Edit User</h3>
                                            <button className="close-button" onClick={() => setSelectedUser(null)}>×</button>
                                        </div>

                                        <div className="user-details">
                                            <div className="user-avatar large">{selectedUser.name.charAt(0)}</div>
                                            <div className="username-display">@{selectedUser.username}</div>
                                            <div className="join-date">Member since {new Date(selectedUser.joinDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</div>
                                        </div>

                                        <form onSubmit={handleUpdateUser} className="edit-form">
                                            <Input
                                                label="Full Name"
                                                name="name"
                                                value={userFormData.name}
                                                onChange={handleUserFormChange}
                                            />
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                value={userFormData.email}
                                                onChange={handleUserFormChange}
                                            />
                                            <Input
                                                label="Username"
                                                name="username"
                                                value={userFormData.username}
                                                onChange={handleUserFormChange}
                                            />

                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Role</label>
                                                    <select
                                                        name="role"
                                                        value={userFormData.role}
                                                        onChange={handleUserFormChange}
                                                        className="admin-select"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label>Account Status</label>
                                                    <select
                                                        name="accountStatus"
                                                        value={userFormData.accountStatus}
                                                        onChange={handleUserFormChange}
                                                        className="admin-select"
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <Button
                                                    type="submit"
                                                    color="blue"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? "Updating..." : "Save Changes"}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    color="black"
                                                    onClick={() => handleResetPassword(selectedUser.id)}
                                                >
                                                    Reset Password
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Project Approval Tab */}
            {activeTab === "projects" && (
                <div className="tab-content">
                    <div className="content-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">Project Submissions</h2>
                            <div className="count-badge">{filteredProjects.length} projects</div>
                        </div>

                        <div className="projects-section">
                            {filteredProjects.length === 0 ? (
                                <div className="no-results">
                                    <div className="no-results-icon">📂</div>
                                    <div className="no-results-text">No projects found matching your criteria</div>
                                </div>
                            ) : (
                                <div className="projects-grid">
                                    {filteredProjects.map(project => (
                                        <div key={project.id} className={`project-card ${project.status}`}>
                                            <div className="project-header">
                                                <div className="project-meta">
                                                    <span className={getStatusBadgeClass(project.status)}>
                                                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                    </span>
                                                    <span className="submission-date">
                                                        {new Date(project.submissionDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="project-submitter">
                                                    <div className="submitter-avatar">{project.submitterName.charAt(0)}</div>
                                                    <span className="submitter-name">
                                                        {project.submitterName}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="project-content">
                                                <ProjectCard
                                                    title={project.title}
                                                    owner={project.submitterName}
                                                    description={project.description}
                                                    repoLink={project.repoLink}
                                                />
                                            </div>

                                            <div className="project-actions">
                                                {project.status === "pending" && (
                                                    <div className="approval-actions">
                                                        <Button
                                                            color="blue"
                                                            size="sm"
                                                            onClick={() => handleProjectStatusChange(project.id, "approved")}
                                                            disabled={isLoading}
                                                            className="approval-button"
                                                        >
                                                            <span className="button-icon">✓</span> Approve
                                                        </Button>
                                                        <Button
                                                            color="black"
                                                            size="sm"
                                                            onClick={() => handleProjectStatusChange(project.id, "declined")}
                                                            disabled={isLoading}
                                                            className="decline-button"
                                                        >
                                                            <span className="button-icon">✕</span> Decline
                                                        </Button>
                                                    </div>
                                                )}

                                                {project.status !== "pending" && (
                                                    <Button
                                                        color="blue"
                                                        size="sm"
                                                        onClick={() => handleProjectStatusChange(project.id, "pending")}
                                                        disabled={isLoading}
                                                        className="reset-button"
                                                    >
                                                        Reset to Pending
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .admin-container {
                  max-width: 1400px;
                  margin: 2rem auto;
                  padding: 2.5rem;
                  background-color: var(--card-bg);
                  border-radius: 20px;
                  box-shadow: var(--shadow-md);
                  backdrop-filter: blur(10px);
                  animation: fadeIn 0.6s ease-out;
                }
                
                .admin-container.dark-mode {
                  border: 2px solid var(--color-blue);
                  box-shadow: 0 0 20px rgba(0, 123, 255, 0.2);
                }
                
                .admin-header {
                  text-align: center;
                  margin-bottom: 2rem;
                }
                
                .admin-title {
                  font-family: var(--font-ibm-plex-mono);
                  font-size: 2.8rem;
                  color: var(--color-blue);
                  margin-bottom: 0.8rem;
                  position: relative;
                  display: inline-block;
                }
                
                .admin-title::after {
                  content: "";
                  position: absolute;
                  bottom: -12px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 100px;
                  height: 4px;
                  background-color: var(--color-blue);
                  border-radius: 2px;
                }
                
                .admin-subtitle {
                  color: var(--text-gray);
                  font-size: 1.2rem;
                  margin-top: 1.2rem;
                  font-family: var(--font-ibm-plex-mono);
                }
                
                .message {
                  margin-bottom: 2rem;
                }
                
                .message-content {
                  padding: 1.2rem;
                  border-radius: 12px;
                  text-align: center;
                  font-family: var(--font-ibm-plex-mono);
                  animation: slideIn 0.4s ease-out;
                  font-size: 1.1rem;
                  max-width: 600px;
                  margin: 0 auto;
                }
                
                .message.success .message-content {
                  background-color: rgba(0, 255, 0, 0.1);
                  border: 1px solid rgba(0, 255, 0, 0.3);
                  color: #00cc00;
                }
                
                .message.error .message-content {
                  background-color: rgba(255, 0, 0, 0.1);
                  border: 1px solid rgba(255, 0, 0, 0.3);
                  color: #ff3333;
                }
                
                .tab-navigation {
                  display: flex;
                  margin-bottom: 2.5rem;
                  border-bottom: 2px solid var(--card-border);
                  padding-bottom: 0.5rem;
                  gap: 1.5rem;
                }
                
                .tab-button {
                  padding: 1rem 1.8rem;
                  background: none;
                  border: none;
                  color: var(--foreground);
                  font-family: var(--font-ibm-plex-mono);
                  font-size: 1.1rem;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  position: relative;
                  display: flex;
                  align-items: center;
                  gap: 0.75rem;
                  border-radius: 8px;
                }
                
                .tab-icon {
                  font-size: 1.2rem;
                }
                
                .tab-button::after {
                  content: "";
                  position: absolute;
                  bottom: -8px;
                  left: 0;
                  width: 100%;
                  height: 4px;
                  background-color: var(--color-blue);
                  transform: scaleX(0);
                  transform-origin: center;
                  transition: transform 0.3s ease;
                  border-radius: 2px;
                }
                
                .tab-button:hover {
                  color: var(--color-blue);
                  background-color: rgba(0, 123, 255, 0.05);
                }
                
                .tab-button.active {
                  color: var(--color-blue);
                  font-weight: 600;
                }
                
                .tab-button.active::after {
                  transform: scaleX(1);
                }
                
                .dashboard-controls {
                  margin-bottom: 2.5rem;
                  display: flex;
                  flex-direction: column;
                  gap: 1.5rem;
                }
                
                .control-panel {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 1.5rem;
                  flex-wrap: wrap;
                }
                
                .search-bar {
                  flex: 1;
                  min-width: 250px;
                }
                
                .filter-options {
                  display: flex;
                  gap: 1rem;
                }
                
                .filter-select {
                  background-color: var(--input-bg);
                  border: 1px solid var(--input-border);
                  color: var(--foreground);
                  padding: 0.8rem 1.2rem;
                  border-radius: 8px;
                  font-family: var(--font-ibm-plex-mono);
                  min-width: 200px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-size: 1rem;
                  outline: none;
                  appearance: none;
                  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
                  background-repeat: no-repeat;
                  background-position: right 1rem top 50%;
                  background-size: 0.7rem auto;
                  padding-right: 2.5rem;
                }
                
                .filter-select:hover,
                .admin-select:hover {
                  border-color: var(--color-blue);
                  box-shadow: 0 0 0 1px rgba(0, 123, 255, 0.2);
                }
                
                .filter-select:focus,
                .admin-select:focus {
                  border-color: var(--color-blue);
                  outline: none;
                  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
                }
                
                .stats-panel {
                  display: flex;
                  gap: 1.5rem;
                  flex-wrap: wrap;
                }
                
                .stat-box {
                  flex: 1;
                  background-color: rgba(0, 123, 255, 0.05);
                  padding: 1.2rem;
                  border-radius: 12px;
                  text-align: center;
                  border: 1px solid var(--card-border);
                  min-width: 150px;
                  transition: all 0.3s ease;
                }
                
                .stat-box:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
                }
                
                .stat-value {
                  font-size: 2.4rem;
                  font-weight: bold;
                  color: var(--color-blue);
                  margin-bottom: 0.5rem;
                  font-family: var(--font-ibm-plex-mono);
                }
                
                .stat-label {
                  color: var(--text-gray);
                  font-family: var(--font-ibm-plex-mono);
                  font-size: 0.9rem;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                
                .tab-content {
                  animation: fadeIn 0.5s ease;
                }
                
                .content-panel {
                  background-color: rgba(255, 255, 255, 0.02);
                  border-radius: 16px;
                  border: 1px solid var(--card-border);
                  overflow: hidden;
                }
                
                .panel-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 1.5rem 2rem;
                  border-bottom: 1px solid var(--card-border);
                  background-color: rgba(0, 0, 0, 0.1);
                }
                
                .panel-title {
                  font-family: var(--font-ibm-plex-mono);
                  color: var(--foreground);
                  font-size: 1.4rem;
                  margin: 0;
                }
                
                .panel-actions {
                  display: flex;
                  gap: 1rem;
                }
                
                .count-badge {
                  background-color: rgba(0, 123, 255, 0.15);
                  color: var(--color-blue);
                  padding: 0.4rem 0.8rem;
                  border-radius: 20px;
                  font-size: 0.9rem;
                  font-family: var(--font-ibm-plex-mono);
                }
                
                /* User Management Specific Styles */
                .users-section {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 0;
                }
                
                .data-table {
                  width: 100%;
                }
                
                .table-header {
                  display: grid;
                  grid-template-columns: 2fr 2.5fr 1fr 1fr 1.5fr 1.5fr;
                  gap: 1rem;
                  background-color: rgba(0, 0, 0, 0.05);
                  padding: 1.2rem 2rem;
                  font-weight: 600;
                  border-bottom: 1px solid var(--card-border);
                  position: sticky;
                  top: 0;
                  z-index: 10;
                }
                
                .header-cell {
                  color: var(--color-blue);
                  font-family: var(--font-ibm-plex-mono);
                  font-size: 0.95rem;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                
                .table-body {
                  max-height: 500px;
                  overflow-y: auto;
                }
                
                .table-row {
                  display: grid;
                  grid-template-columns: 2fr 2.5fr 1fr 1fr 1.5fr 1.5fr;
                  gap: 1rem;
                  padding: 1.2rem 2rem;
                  border-bottom: 1px solid var(--card-border);
                  transition: background-color 0.2s ease;
                  align-items: center;
                }
                
                .table-row:hover {
                  background-color: rgba(0, 123, 255, 0.05);
                }
                
                .table-row:last-child {
                  border-bottom: none;
                }
                
                .table-cell {
                  display: flex;
                  align-items: center;
                }
                
                .user-avatar {
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  background-color: var(--color-blue);
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  margin-right: 12px;
                  font-size: 1rem;
                }
                
                .user-avatar.large {
                  width: 80px;
                  height: 80px;
                  font-size: 2rem;
                  margin: 0 auto 1rem;
                }
                
                .user-name {
                  font-weight: 500;
                }
                
                .name-cell {
                  font-weight: 500;
                }
                
                .role-badge,
                .status-badge {
                  padding: 0.4rem 0.8rem;
                  border-radius: 20px;
                  font-family: var(--font-ibm-plex-mono);
                  font-size: 0.8rem;
                  font-weight: bold;
                  text-transform: uppercase;
                  white-space: nowrap;
                }
                
                .role-badge.admin {
                  background-color: rgba(128, 0, 128, 0.2);
                  color: #9932CC;
                  border: 1px solid rgba(128, 0, 128, 0.3);
                }
                
                .role-badge.user {
                  background-color: rgba(0, 0, 255, 0.1);
                  color: #0066ff;
                  border: 1px solid rgba(0, 0, 255, 0.2);
                }
                
                .status-badge.active {
                  background-color: rgba(0, 255, 0, 0.1);
                  color: #00cc00;
                  border: 1px solid rgba(0, 255, 0, 0.3);
                }
                
                .status-badge.inactive {
                  background-color: rgba(255, 0, 0, 0.1);
                  color: #ff3333;
                  border: 1px solid rgba(255, 0, 0, 0.3);
                }
                
                .status-badge.approved {
                  background-color: rgba(0, 255, 0, 0.1);
                  color: #00cc00;
                  border: 1px solid rgba(0, 255, 0, 0.3);
                }
                
                .status-badge.pending {
                  background-color: rgba(255, 165, 0, 0.1);
                  color: #ffa500;
                  border: 1px solid rgba(255, 165, 0, 0.3);
                }
                
                .status-badge.declined {
                  background-color: rgba(255, 0, 0, 0.1);
                  color: #ff3333;
                  border: 1px solid rgba(255, 0, 0, 0.3);
                }
                
                .action-buttons {
                  display: flex;
                  gap: 0.5rem;
                  justify-content: flex-end;
                }
                
                .user-edit-panel {
                  position: fixed;
                  top: 0;
                  right: 0;
                  width: 400px;
                  height: 100vh;
                  background-color: var(--card-bg);
                  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
                  z-index: 100;
                  animation: slideInFromRight 0.3s ease-out;
                  border-left: 1px solid var(--card-border);
                }
                
                .panel-scroll-container {
                  height: 100%;
                  overflow-y: auto;
                  padding: 2rem;
                }
                
                .close-button {
                  background: none;
                  border: none;
                  color: var(--text-gray);
                  font-size: 1.8rem;
                  cursor: pointer;
                  transition: color 0.2s ease;
                }
                
                .close-button:hover {
                  color: var(--color-blue);
                }
                
                .edit-title {
                  color: var(--color-blue);
                  margin: 0;
                  font-family: var(--font-ibm-plex-mono);
                }
                
                .user-details {
                  margin: 1.5rem 0;
                  text-align: center;
                }
                
                .username-display {
                  font-family: var(--font-ibm-plex-mono);
                  color: var(--color-blue);
                  font-size: 1.2rem;
                  margin-bottom: 0.5rem;
                }
                
                .join-date {
                  color: var(--text-gray);
                  font-size: 0.9rem;
                }
                
                .edit-form {
                  display: flex;
                  flex-direction: column;
                  gap: 1.5rem;
                }
                
                .form-row {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 1rem;
                }
                
                .form-group {
                  margin-bottom: 0;
                }
                
                .form-group label {
                  display: block;
                  margin-bottom: 0.5rem;
                  font-family: var(--font-ibm-plex-mono);
                  color: var(--foreground);
                }
                
                .admin-select {
                  width: 100%;
                  background-color: var(--input-bg);
                  border: 1px solid var(--input-border);
                  color: var(--foreground);
                  padding: 0.8rem 1.2rem;
                  border-radius: 8px;
                  font-family: var(--font-ibm-plex-mono);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  appearance: none;
                  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
                  background-repeat: no-repeat;
                  background-position: right 1rem top 50%;
                  background-size: 0.7rem auto;
                  padding-right: 2.5rem;
                }
                
                .form-actions {
                  display: flex;
                  justify-content: space-between;
                  margin-top: 1rem;
                }
                
                /* Project Approval Specific Styles */
                .projects-section {
                  padding: 1.5rem 2rem;
                }
                
                .projects-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                  gap: 2rem;
                }
                
                .project-card {
                  display: flex;
                  flex-direction: column;
                  gap: 1.2rem;
                  border: 1px solid var(--card-border);
                  border-radius: 12px;
                  padding: 1.5rem;
                  background-color: var(--card-bg);
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                }
                
                .project-card::before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 6px;
                  background-color: var(--color-blue);
                  opacity: 0.5;
                }
                
                .project-card.pending::before {
                  background-color: #ffa500;
                }
                
                .project-card.approved::before {
                  background-color: #00cc00;
                }
                
                .project-card.declined::before {
                  background-color: #ff3333;
                }
                
                .project-card:hover {
                  transform: translateY(-5px);
                  box-shadow: var(--shadow-md);
                }
                
                .project-header {
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  gap: 1rem;
                }
                
                .project-meta {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  flex-wrap: wrap;
                }
                
                .project-submitter {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }
                
                .submitter-avatar {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  background-color: var(--color-blue);
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  font-size: 0.9rem;
                }
                
                .submitter-name {
                  color: var(--text-gray);
                  font-size: 0.9rem;
                }
                
                .submission-date {
                  color: var(--text-gray);
                  font-size: 0.9rem;
                  font-family: var(--font-ibm-plex-mono);
                }
                
                .project-content {
                  width: 100%;
                }
                
                .project-actions {
                  display: flex;
                  justify-content: center;
                  gap: 1rem;
                  margin-top: 1rem;
                }
                
                .approval-actions {
                  display: flex;
                  gap: 1rem;
                  width: 100%;
                }
                
                .approval-button, .decline-button, .reset-button {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                }
                
                .button-icon {
                  font-size: 1.1rem;
                }
                
                .no-results {
                  text-align: center;
                  padding: 4rem 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 1.5rem;
                }
                
                .no-results-icon {
                  font-size: 3rem;
                  color: var(--text-gray);
                }
                
                .no-results-text {
                  color: var(--text-gray);
                  font-family: var(--font-ibm-plex-mono);
                  font-size: 1.2rem;
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
                    transform: translateY(-15px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                @keyframes slideInFromRight {
                  from {
                    transform: translateX(100%);
                  }
                  to {
                    transform: translateX(0);
                  }
                }
                
                /* Responsive Adjustments */
                @media (min-width: 1024px) {
                  .users-section {
                    grid-template-columns: 1fr auto;
                    position: relative;
                  }
                  
                  .data-table {
                    overflow-x: auto;
                  }
                }
                
                @media (max-width: 1200px) {
                  .projects-grid {
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                  }
                }
                
                @media (max-width: 1023px) {
                  .user-edit-panel {
                    width: 90%;
                    max-width: 500px;
                  }
                }
                
                @media (max-width: 850px) {
                  .admin-container {
                    padding: 1.5rem;
                    margin: 1rem;
                  }
                  
                  .admin-title {
                    font-size: 2.2rem;
                  }
                  
                  .table-header {
                    display: none;
                  }
                  
                  .table-row {
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem;
                    border: 1px solid var(--card-border);
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    gap: 1rem;
                  }
                  
                  .table-cell {
                    position: relative;
                    padding-left: 120px;
                    min-height: 40px;
                    display: flex;
                    align-items: center;
                  }
                  
                  .table-cell::before {
                    content: attr(data-label);
                    position: absolute;
                    left: 0;
                    width: 110px;
                    font-weight: bold;
                    color: var(--color-blue);
                    font-family: var(--font-ibm-plex-mono);
                    font-size: 0.85rem;
                  }
                  
                  .name-cell::before { content: "Name"; }
                  .email-cell::before { content: "Email"; }
                  .role-cell::before { content: "Role"; }
                  .status-cell::before { content: "Status"; }
                  .date-cell::before { content: "Joined"; }
                  .actions-cell::before { content: "Actions"; }
                  
                  .projects-grid {
                    grid-template-columns: 1fr;
                  }
                }
                
                @media (max-width: 600px) {
                  .table-cell {
                    padding-left: 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                  }
                  
                  .table-cell::before {
                    position: relative;
                    width: 100%;
                  }
                  
                  .stats-panel {
                    flex-direction: column;
                  }
                  
                  .form-row {
                    grid-template-columns: 1fr;
                  }
                  
                  .control-panel {
                    flex-direction: column;
                  }
                  
                  .filter-options {
                    width: 100%;
                  }
                  
                  .filter-select {
                    width: 100%;
                  }
                }
            `}</style>
        </div>
    );
}