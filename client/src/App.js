// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Header from "./components/Header"; // Ensure this is imported
import ProjectView from "./components/ProjectView";
import TaskView from "./components/TaskView";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  return (
    <Router>
      <Header /> {/* Header outside the main tag */}
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/not-started"
              element={<ProjectView status="Not Started" />}
            />
            <Route
              path="/in-progress"
              element={<ProjectView status="In Progress" />}
            />
            <Route
              path="/completed"
              element={<ProjectView status="Completed" />}
            />
            <Route path="/my-tasks" element={<TaskView />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
