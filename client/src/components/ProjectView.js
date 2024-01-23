import React from "react";

const ProjectView = ({ status }) => {
  return (
    <div>
      <h1>{status}</h1>
      <div className="project-item"></div>
    </div>
  );
};

export default ProjectView;
