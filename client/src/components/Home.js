// components/Home.js
import React, { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component is mounted
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks"); // Use your backend's URL
      const data = await response.json();
      setTasks(data); // Set tasks in state
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Welcome to On My Plate!</h1>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-box"
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <h3>{task.title}</h3>
            <p>Complete: {task.complete ? "Yes" : "No"}</p>
            {/* Display other task details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
