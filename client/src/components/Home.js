import React, { useState, useEffect } from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

const Home = ({ user }) => {
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

    // Define a function for auto-refresh
    const autoRefreshData = () => {
      // Fetch data initially when the component mounts
      fetchTasks();
      fetchProjects();

      // Set up auto-refresh using setInterval (e.g., every minute)
      const refreshInterval = setInterval(() => {
        fetchTasks(); // Fetch tasks at regular intervals
        fetchProjects(); // Fetch projects at regular intervals
      }, 600); // 60000 milliseconds = 1 minute

      // Return a cleanup function to clear the interval when the component unmounts
      return () => {
        clearInterval(refreshInterval); // Clear the auto-refresh interval
      };
    };

    // Call autoRefreshData to start the auto-refresh process
    const cleanup = autoRefreshData();

    // Return a cleanup function to clear any resources when the component unmounts
    return () => {
      cleanup(); // Clear the auto-refresh interval when the component unmounts
    };
  }, []);

  const handleCompleteTaskClick = async (taskId) => {
    try {
      const response = await fetch(`/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, complete: true } : task
          )
        );
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
        // Update the project in the local state
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId
              ? { ...project, status: "Completed" }
              : project
          )
        );
        // Clear the editing state
        setEditingProjectId(null);
        setEditingProjectTitle("");
      } else {
        console.error("Failed to mark project as complete");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Send a DELETE request to the server to delete the task
      const response = await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the deletion was successful, remove the task from the tasks state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      // Send a DELETE request to the server to delete the project
      const response = await fetch(`/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the deletion was successful, remove the project from the projects state
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditTaskClick = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTitle(taskToEdit.title);
    }
  };

  const handleEditProjectClick = (projectId) => {
    setEditingProjectId(projectId);
    const projectToEdit = projects.find((project) => project.id === projectId);
    if (projectToEdit) {
      setEditingProjectTitle(projectToEdit.title);
    }
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
        // Assuming the edited task object includes the updated title,
        // you can update the task in the local state.
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, title: editedTask.title } : task
          )
        );

        // Clear the editing state
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
        // Assuming the edited project object includes the updated title,
        // you can update the project in the local state.
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId
              ? { ...project, title: editedProject.title }
              : project
          )
        );

        // Clear the editing state
        setEditingProjectId(null);
        setEditingProjectTitle("");
      } else {
        console.error("Failed to save project edits");
      }
    } catch (error) {
      console.error("Error saving project edits:", error);
    }
  };

  const handleDeleteClick = (taskId) => {
    // Call the deleteTask function with the taskId to delete the task.
    deleteTask(taskId);
  };

  const handleDeleteProject = (projectId) => {
    // Call the deleteProject function with the projectId to delete the project.
    deleteProject(projectId);
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
            <p>Project: {task.project ? task.project.title : "N/A"}</p>
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
                <button
                  className="delete-button" // Add a CSS class for styling
                  onClick={() => handleDeleteClick(task.id)} // Handle task deletion
                >
                  🗑️
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
              <>
                <button
                  className="edit-button"
                  onClick={() => handleEditProjectClick(project.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button" // Add a CSS class for styling
                  onClick={() => handleDeleteProject(project.id)} // Handle project deletion
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
