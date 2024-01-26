import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Import Home component
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import TaskView from "./components/TaskView";
import Login from "./components/Login";
import NewTaskButton from "./components/NewTaskButton";
import MyProjects from "./components/MyProjects";
import MyTasks from "./components/MyTasks";
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

  // const logout = () => {
  //   fetch("/logout", { method: "DELETE" })
  //     .then(() => setUser(null))
  //     .catch((error) => console.error("Error logging out:", error));
  // };

  const handleTaskCreate = async (newTask) => {
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
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tasks={tasks}
                  updateTaskCompletion={updateTaskCompletion}
                  user={user}
                  handleTaskCreate={handleTaskCreate}
                />
              }
            />
            <Route
              path="/completed"
              element={
                <TaskView
                  tasks={tasks.filter((task) => task.complete)}
                  updateTaskCompletion={updateTaskCompletion}
                />
              }
            />
            <Route
              path="/my-tasks"
              element={
                <MyTasks
                  tasks={tasks}
                  user={user}
                  updateTaskCompletion={updateTaskCompletion}
                />
              }
            />
            <Route path="/my-projects" element={<MyProjects user={user} />} />
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
      <Header setUser={setUser} user={user} />
      {view}
    </Router>
  );
}

export default App;
