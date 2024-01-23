import React, { useState, useEffect } from "react";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks"); // Update with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-item"
          style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}
        >
          <h3>{task.title}</h3>
          <p>Complete: {task.complete ? "Yes" : "No"}</p>
          {/* Add more task details here */}
        </div>
      ))}
    </div>
  );
};

export default TaskView;
