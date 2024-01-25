import React, { useState, useEffect } from "react";

const MyProjects = ({ user, handleDeleteProject }) => {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects:", response.statusText);
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

  const handleEditClick = (projectId) => {
    setEditingProjectId(projectId);
    const projectToEdit = projects.find((project) => project.id === projectId);
    setEditingTitle(projectToEdit.title);
  };

  const handleSaveEdit = async (projectId) => {
    const editedProject = { title: editingTitle };
    try {
      const response = await fetch(`/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProject),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId ? updatedProject : project
          )
        );
        setEditingProjectId(null);
        setEditingTitle("");
      } else {
        console.error("Failed to save project edits");
      }
    } catch (error) {
      console.error("Error saving project edits:", error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.tasks.some((task) => task.user_id === user.id)
  );

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>
            {editingProjectId === project.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
            ) : (
              project.title
            )}
          </h3>
          <p>{project.description}</p>

          {editingProjectId === project.id ? (
            <>
              <br />
              <h4>Tasks</h4>
              {project.tasks.map((task) => (
                <p key={task.id}>
                  {task.title} - {task.complete ? "Complete" : "Incomplete"}
                </p>
              ))}
              {/* Add a button to save project edits */}
              <button
                className="save-button"
                onClick={() => handleSaveEdit(project.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                className="edit-button"
                onClick={() => handleEditClick(project.id)}
              >
                Edit
              </button>
              <button
                className="delete-button" // Add a CSS class for styling
                onClick={() => handleDeleteProject(project.id)} // Handle project deletion
              >
                🗑️
              </button>
              <button
                className="complete-button"
                onClick={() => handleProjectCompleteClick(project.id)}
              >
                ✓
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProjects;
