import React, { useState, useEffect } from "react";
import "../App.css";

const Home = ({ user, updateTaskCompletion }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

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

  const handleCompleteClick = async (taskId) => {
    try {
      const response = await fetch(`/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });

      if (response.ok) {
        // Update the global tasks state
        updateTaskCompletion(taskId, true);

        // Update the local tasks state
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

  return (
    <div>
      <h1>Welcome, {user?.username || "Guest"}!</h1>
      <h2>Tasks</h2>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="task-box">
            <h3>{task.title}</h3>
            <p>Assigned to: {task.users.username}</p>
            <p>Complete: {task.complete ? "Yes" : "No"}</p>
            {!task.complete && (
              <button
                className="complete-button"
                onClick={() => handleCompleteClick(task.id)}
              >
                ✓
              </button>
            )}
          </div>
        ))}
      </div>
      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
