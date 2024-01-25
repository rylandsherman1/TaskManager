import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyTasks = ({user}) => {

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

    const filteredTasks = tasks.filter((task) => task.user_id === user.id)

    return (
      <div>
        <h1>My Tasks</h1>
        {filteredTasks.map((task) => (
        <div key={task.id} className="task-box">
          <h3>{task.title}</h3>
          <p>Complete: {task.complete ? "Yes" : "No"}</p>
        </div>
        ))}
      </div>
    );
}

export default MyTasks