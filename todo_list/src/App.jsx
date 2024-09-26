import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskService';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleAddOrUpdateTask = async (task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await addTask(task);
    }
    loadTasks();
    setCurrentTask(null);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setCurrentTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    loadTasks();
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm currentTask={currentTask} onSave={handleAddOrUpdateTask} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;

