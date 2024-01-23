// components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      style={{
        padding: "20px",
        height: "100%",
        width: "200px",
        background: "#5db6ff",
      }}
    >
      <NavLink to="/" style={{ margin: "5px" }}>
        Home
      </NavLink>
      <NavLink to="/not-started" style={{ margin: "5px" }}>
        Not Started
      </NavLink>
      <NavLink to="/in-progress" style={{ margin: "5px" }}>
        In Progress
      </NavLink>
      <NavLink to="/completed" style={{ margin: "5px" }}>
        Completed
      </NavLink>
      <NavLink to="/my-tasks" style={{ margin: "5px" }}>
        My Tasks
      </NavLink>
      <NavLink to="/my-projects" style={{ margin: "5px" }}>
        My Projects
      </NavLink>
    </nav>
  );
};

export default NavBar;
