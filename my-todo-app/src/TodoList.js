import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/items/');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
}

export default TodoList;
