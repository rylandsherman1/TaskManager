// App.js
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
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/check_session')
    .then(r => r.json())
    .then((data) => {
      if (data.id) {
        setUser(data);
      } else {
        setUser(null);
      }
    });
  }, []);

  let view;
  if (user) {
    view = (
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
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
            <Route path="/my-projects" element={<MyProjects />} />
          </Routes>
        </main>
        <NewTaskButton />
      </div>
    );
  } else if (user === null) {
    view = (
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path='signup' element={<Signup setUser={setUser}/>} />
      </Routes>
    )
  } else {
    view = <p>Loading...</p>
  }

  return (
    <Router>
      <Header setUser={setUser} user={user}/> {/* Header outside the main tag */}
      {view}
    </Router>
  );
}

export default App;
