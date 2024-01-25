// TaskView.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    return location.pathname === "/completed" ? task.complete : !task.complete;
  });

  return (
    <div>
      <h1>
        {location.pathname === "/completed" ? "Completed Tasks" : "Tasks"}
      </h1>
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-box">
          <h3>{task.title}</h3>
          <p>Complete: {task.complete ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskView;
