import React, { useState, useEffect } from "react";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectCompleteClick = async (projectId) => {
    try {
      const response = await fetch(`/projects/${projectId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId
              ? { ...project, status: "Completed" }
              : project
          )
        );
      } else {
        console.error("Failed to mark project as complete");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <h4>Tasks</h4>
          <p>{project.tasks.title}</p>
          {/* Add a button to mark the project as complete */}
          {project.status !== "Completed" && (
            <button
              className="complete-button"
              onClick={() => handleProjectCompleteClick(project.id)}
            >
              ✓ {/* Checkmark character */}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProjects;
