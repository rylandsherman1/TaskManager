import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyTasks = ({ user, updateTaskCompletion }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
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

  const handleCompleteClick = async (taskId) => {
    try {
      const response = await fetch(`/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });

      if (response.ok) {
        // Update the global tasks state
        updateTaskCompletion(taskId, true);

        // Move the task to the completedTasks array
        setTasks((prevTasks) => {
          const completedTask = prevTasks.find((task) => task.id === taskId);
          setCompletedTasks((prevCompletedTasks) => [
            ...prevCompletedTasks,
            completedTask,
          ]);
          return prevTasks.filter((task) => task.id !== taskId);
        });
      } else {
        console.error("Failed to mark task as complete");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => task.user_id === user.id && !task.complete
  );

  return (
    <div>
      <h1>
        {location.pathname === "/completed" ? "Completed Tasks" : "My Tasks"}
      </h1>
      {location.pathname === "/completed"
        ? completedTasks.map((task) => (
            <div key={task.id} className="task-box">
              <h3>{task.title}</h3>
              <p>Complete: Yes</p>
            </div>
          ))
        : filteredTasks.map((task) => (
            <div key={task.id} className="task-box">
              <h3>{task.title}</h3>
              <p>Project: {task.project.title}</p>
              {!task.complete && (
                <button
                  className="complete-button"
                  onClick={() => handleCompleteClick(task.id)}
                >
                  ✓
                </button>
              )}
            </div>
          ))}
    </div>
  );
};

export default MyTasks