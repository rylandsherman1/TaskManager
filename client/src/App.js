import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Header from "./components/Header"; // Ensure this is imported
import ProjectView from "./components/ProjectView";
import TaskView from "./components/TaskView";
import Login from "./components/Login";
import NewTaskButton from "./components/NewTaskButton";
import MyProjects from "./components/MyProjects";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => console.error("Error checking session:", error));
  }, []);

  const logout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(() => setUser(null))
      .catch((error) => console.error("Error logging out:", error));
  };

  const handleTaskCreate = async (newTask) => {
    // Add the new task to your state (or update your state with the latest tasks)
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };


  const updateTaskCompletion = async (taskId, isComplete) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, complete: isComplete } : task
      )
    );
  };


  let view;
  if (user) {
    view = (
      <div className="App">
        <NavBar />
        <main>
          {/* <button type="button" onClick={logout}>
            Log Out
          </button> */}
          <Routes>
            <Route
              path="/"
              element={<Home updateTaskCompletion={updateTaskCompletion} />}
            />

            <Route
              path="/not-started"
              element={<ProjectView status="Not Started" />}
            />
            <Route
              path="/in-progress"
              element={<ProjectView status="In Progress" />}
            />
            <Route path="/completed" element={<TaskView />} />
            <Route path="/my-tasks" element={<TaskView />} />
            <Route path="/my-projects" element={<MyProjects />} />
          </Routes>
        </main>
        <NewTaskButton onTaskCreate={handleTaskCreate} />
      </div>
    );
  } else if (user === null) {
    view = (
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="signup" element={<Signup setUser={setUser} />} />
      </Routes>
    );
  } else {
    view = <p>Loading...</p>;
  }

  return (
    <Router>
      <Header setUser={setUser} user={user} />{" "}
      {/* Header outside the main tag */}
      {view}
    </Router>
  );
}

export default App;
