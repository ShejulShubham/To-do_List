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
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    try {
      if (task.id) {
        const result = await updateTask(task);
      } else {
        const result = await addTask(task);
      }
    } catch (error) {
      handleError(error);
    }
    loadTasks();
    setCurrentTask(null);
    setIsFormVisible(false);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setCurrentTask(task);
    setIsFormVisible(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      // console.log(JSON.stringify(result.data));
    } catch (error) {
      handleError(error);
    }
    toast.success("Task is Deleted");
    loadTasks();
  };

  const handleAddNewTaskClick = () => {
    setCurrentTask(null);
    setIsFormVisible(true);
  };

  return (
    <div className="todo-list">
      <div className="content p-4 w-100">
          <div className="header d-flex justify-content-between align-items-center mb-4">
              <h1>Tasks</h1>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleAddNewTaskClick}>
                Add New Task
                </button>
              </div>
          </div>
          {/* Conditionally show TaskForm */}
          {isFormVisible && (
          <div className="overlay">
            <TaskForm
              currentTask={currentTask}
              onSave={handleAddOrUpdateTask}
              onCancel={() => setIsFormVisible(false)}
            />
          </div>
          )}
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

