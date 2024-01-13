import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', repeatable: false, completed: false },
    { id: 2, name: 'Task 2', repeatable: true, completed: false },
    // Add more tasks as needed
  ]);
  const [currentTask, setCurrentTask] = useState(null);

  const getRandomTask = () => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    if (incompleteTasks.length === 0) {
      alert('No more tasks!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * incompleteTasks.length);
    setCurrentTask(incompleteTasks[randomIndex]);
  };

  const markTaskCompleted = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (task.repeatable) {
          // Reset the task after some time if it's repeatable
          setTimeout(() => {
            setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, completed: false } : t));
          }, 5000); // 5 seconds for example
        }
        return { ...task, completed: true };
      }
      return task;
    }));
    setCurrentTask(null);
  };

  useEffect(() => {
    getRandomTask(); // Get a random task on initial load
  }, []);

  return (
    <div className="App">
      <h1>Pomodoro Task Lootbox</h1>
      {currentTask && (
        <div>
          <h2>{currentTask.name}</h2>
          <button onClick={() => markTaskCompleted(currentTask.id)}>Mark as Completed</button>
        </div>
      )}
      <button onClick={getRandomTask}>Get Random Task</button>
    </div>
  );
}

export default App;
