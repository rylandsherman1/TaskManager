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
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCompleteClick = async (taskId) => {
    try {
      const response = await fetch(`/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, complete: true } : task
          )
        );
      } else {
        console.error("Failed to mark task as complete");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (location.pathname === "/completed") {
      return task.complete; // Show only completed tasks
    }
    return true; // Default: show all tasks
  });

  return (
    <div>
      <h1>Tasks</h1>
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-box">
          <p>{task.title}</p>
          <p>Complete: {task.complete ? "Yes" : "No"}</p>
          {!task.complete && (
            <button
              className="complete-button"
              onClick={() => handleCompleteClick(task.id)}
            >
              ✓ {/* Checkmark character */}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskView;
