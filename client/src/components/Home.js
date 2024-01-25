// components/Home.js
import React, { useState, useEffect } from "react";

const Home = ({user}) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component is mounted
    const fetchTasks = async () => {
      const response = await fetch("/tasks"); // Use your backend's URL
      const data = await response.json();
      setTasks(data); // Set tasks in state
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchTasks();
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h2>Tasks</h2>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="task-box">
            <h3>{task.title}</h3>
            <p>Complete: {task.complete ? "Yes" : "No"}</p>
            <p>Assigned to: {task.users.username}</p>
            {/* Display other task details */}
          </div>
        ))}
      </div>
      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {/* Additional project details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
