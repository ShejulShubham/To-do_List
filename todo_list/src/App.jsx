import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskService';
import handleError from './utils';
import { toast } from 'react-toastify';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);


  const loadTasks = async () => {
    try {
      const data = await getTasks(pageNumber);
      // console.log(JSON.stringify(data));
      setTasks(data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddOrUpdateTask = async (task) => {
    if (task.id) {
      const result = await updateTask(task);
    } else {
      const result = await addTask(task);
    }
    loadTasks();
    setCurrentTask(null);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setCurrentTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      console.log(JSON.stringify(result.data));
      toast.success(result);
    } catch (error) {
      handleError(error);
    }
    loadTasks();
  };

  return (
    <div className="todo-list">
      <div className="content p-4 w-100">
          <div className="header d-flex justify-content-between align-items-center mb-4">
              <h1>Tasks</h1>
              <div className="d-grid gap-2"></div>
          </div>
              <table className="table table-striped table-bordered table-hover">
                  <thead>
                      <tr>
                          <th>Id</th>
                          <th>Assigned To</th>
                          <th>Status</th>
                          <th>Due Date</th>
                          <th>Priority</th>
                          <th>Comments</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                    <TaskList 
                      tasks={tasks}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
              </table>
      </div>
    </div>
  );
};

export default App;

