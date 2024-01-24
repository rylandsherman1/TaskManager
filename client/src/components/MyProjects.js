// components/MyProjects.js
import React, { useState, useEffect } from "react";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects when the component is mounted
    // Update this URL to match your backend API endpoint
    fetch("/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {/* Additional project details */}
        </div>
      ))}
    </div>
  );
};

export default MyProjects;
