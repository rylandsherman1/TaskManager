import React, { useState, useEffect } from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

const Home = ({ user, updateTaskCompletion, updateProjectCompletion }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectTitle, setEditingProjectTitle] = useState("");


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

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

    fetchTasks();
    fetchProjects();
  }, []);

  const handleCompleteTaskClick = async (taskId) => {
    try {
      const response = await fetch(`/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });

      if (response.ok) {
        updateTaskCompletion(taskId, true);

        // Fetch the updated list of tasks
        const updatedTasksResponse = await fetch("/tasks");
        if (updatedTasksResponse.ok) {
          const updatedTasks = await updatedTasksResponse.json();
          setTasks(updatedTasks);
        } else {
          console.error("Failed to fetch updated tasks");
        }
      } else {
        console.error("Failed to mark task as complete");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const handleCompleteProjectClick = async (projectId) => {
    try {
      const response = await fetch(`/projects/${projectId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (response.ok) {
        updateProjectCompletion(projectId, "Completed");
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

  const handleEditTaskClick = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTitle(taskToEdit.title);
  };

  const handleEditProjectClick = (projectId) => {
    setEditingProjectId(projectId);
    const projectToEdit = projects.find((project) => project.id === projectId);
    setEditingProjectTitle(projectToEdit.title);
  };

  const handleSaveTaskEdit = async (taskId) => {
    const editedTask = { title: editingTitle };
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
        setEditingTaskId(null);
        setEditingTitle("");
      } else {
        console.error("Failed to save task edits");
      }
    } catch (error) {
      console.error("Error saving task edits:", error);
    }
  };

  const handleSaveProjectEdit = async (projectId) => {
    const editedProject = { title: editingProjectTitle };
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
        setEditingProjectTitle("");
      } else {
        console.error("Failed to save project edits");
      }
    } catch (error) {
      console.error("Error saving project edits:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
     return location.pathname === "/completed" ? task.complete : !task.complete;
   });

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <br />
      <h2>Tasks</h2>
      <div>
        {filteredTasks.map((task) => (
         <div key={task.id} className="task-box">
            <h3>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              ) : (
                task.title
              )}
            </h3>
            <p>Assigned to: {task.users ? task.users.username : "N/A"}</p>
            <p>Project: {task.project.title}</p>
            <p>Complete: {task.complete ? "Yes" : "No"}</p>
            {editingTaskId === task.id ? (
              <button
                className="save-button"
                onClick={() => handleSaveTaskEdit(task.id)}
              >
                Save
              </button>
            ) : (
              <>
                <button
                  className="edit-button"
                  onClick={() => handleEditTaskClick(task.id)}
                >
                  Edit
                </button>
                {!task.complete && (
                  <button
                    className="complete-button"
                    onClick={() => handleCompleteTaskClick(task.id)}
                  >
                    ✓
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <br />
      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h3>
              {editingProjectId === project.id ? (
                <input
                  type="text"
                  value={editingProjectTitle}
                  onChange={(e) => setEditingProjectTitle(e.target.value)}
                />
              ) : (
                project.title
              )}
            </h3>
            <p>{project.description}</p>
            {project.status !== "Completed" && (
              <button
                className="complete-button"
                onClick={() => handleCompleteProjectClick(project.id)}
              >
                ✓
              </button>
            )}
            {editingProjectId === project.id ? (
              <button
                className="save-button"
                onClick={() => handleSaveProjectEdit(project.id)}
              >
                Save
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => handleEditProjectClick(project.id)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
