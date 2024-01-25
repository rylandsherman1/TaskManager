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

    const filteredTasks = tasks.filter((tasks) => tasks.user_id = user.id ? tasks : null)

}

export default MyTasks