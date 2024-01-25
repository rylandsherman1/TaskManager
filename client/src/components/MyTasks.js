import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyTasks = ({ user, updateTaskCompletion }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
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

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTitle(taskToEdit.title);
  };

  const handleSaveEdit = async (taskId) => {
    const editedTask = { title: editingTitle };
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
        setEditingTaskId(null);
      } else {
        console.error("Failed to save task edits");
      }
    } catch (error) {
      console.error("Error saving task edits:", error);
    }
  };

  const handleDeleteClick = async (taskId) => {
    try {
      // Send a DELETE request to the server to delete the task
      const response = await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the deletion was successful, remove the task from the tasks state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-box">
          <h3>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
            ) : (
              task.title
            )}
          </h3>
          <p>Assigned to: {task.users ? task.users.username : "N/A"}</p>
          <p>Complete: {task.complete ? "Yes" : "No"}</p>
          <button
            className="edit-button"
            onClick={() => handleEditClick(task.id)}
          >
            Edit
          </button>
          {editingTaskId === task.id && (
            <button
              className="save-button"
              onClick={() => handleSaveEdit(task.id)}
            >
              Save
            </button>
          )}
          <button
            className="delete-button" // Add a CSS class for styling
            onClick={() => handleDeleteClick(task.id)} // Handle task deletion
          >
            🗑️
          </button>
                <button
                  className="complete-button"
                  onClick={() => handleCompleteClick(task.id)}
                >
                  ✓
                </button>

        </div>
      ))}
    </div>
  );
};

export default MyTasks