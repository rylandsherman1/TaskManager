import React, { useState, useEffect } from "react";

const ProjectView = ({ status }) => {
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

  // Filter projects based on the status passed to the component
  const filteredProjects = projects.filter((project) => {
    return status === "All" ? true : project.status === status;
  });

  return (
    <div>
      <h1>{status} Projects</h1>
      {filteredProjects.map((project) => (
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
            <button
              className="save-button"
              onClick={() => handleSaveEdit(project.id)}
            >
              Save
            </button>
          ) : (
            <>
              <button
                className="edit-button"
                onClick={() => handleEditClick(project.id)}
              >
                Edit
              </button>
              {project.status !== "Completed" && (
                <button
                  className="complete-button"
                  onClick={() => handleProjectCompleteClick(project.id)}
                >
                  ✓
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectView;
