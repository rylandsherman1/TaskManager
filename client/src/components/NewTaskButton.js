import React, { useState } from "react";

const NewTaskButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleCreateTask = () => {
    // Here you would typically send the task data to your backend
    console.log("Creating task with:", title, date, time);
    alert(`New task posted: ${title}`);
    setShowForm(false); // Close the form after creating the task
    // Clear form fields
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
