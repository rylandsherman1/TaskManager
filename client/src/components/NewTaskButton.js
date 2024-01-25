import React, { useState } from "react";

const NewTaskButton = ({ onTaskCreate }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleCreateTask = async () => {
    // Construct the new task object
    const newTask = { title, date, time, complete: false };

    // Send POST request to server
    try {
      const response = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert(`New task posted: ${title}`);
        onTaskCreate(responseData); // Update tasks state in parent component
      } else {
        console.error("Failed to create task", responseData);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }

    // Reset form and close it
    setShowForm(false);
    setTitle("");
    setDate("");
    setTime("");
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <button
        onClick={handleButtonClick}
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          fontSize: "24px",
          textAlign: "center",
          lineHeight: "50px",
          backgroundColor: "#5db6ff",
        }}
      >
        +
      </button>
      {showForm && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "0",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#5db6ff",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <button onClick={handleCreateTask}>Create Task</button>
        </div>
      )}
    </div>
  );
};

export default NewTaskButton;
