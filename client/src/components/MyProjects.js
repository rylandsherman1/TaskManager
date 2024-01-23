// components/MyProjects.js
import React, { useState, useEffect } from "react";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects when the component is mounted
    // Update this URL to match your backend API endpoint
    fetch("http://localhost:5000/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {/* Add more project details here */}
        </div>
      ))}
    </div>
  );
};

export default MyProjects;
