import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskService';
import handleError from './utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [totalTasks, setTotalTasks] = useState(0);
  
  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks(pageNumber);
      setTotalTasks(data.totalTasks);
      console.log(data.formattedTasks)
      setTasks(data.formattedTasks);
    } catch (error) {
      handleError(error);
    }
  }, [pageNumber]) ;

  
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);



  const handleAddOrUpdateTask = async (task) => {
    let flag = true
    try {
      if (task.id) {
        await updateTask(task);
        flag = false
      } else {
        await addTask(task);
      }
    } catch (error) {
      handleError(error);
    }

    if(flag){
      toast.success("New Task added Successfully")
    } else {
      toast.success("Task updated Successfully")
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
      await deleteTask(taskId);
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

  const handlePageChange = (newPageNumber) => {
    const maxPage = Math.ceil(totalTasks / 5);
    if (newPageNumber >= 1 && newPageNumber <= maxPage) {
      setPageNumber(newPageNumber);
    }
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
          <div className='row'>
            <div className='col col-8'></div>
            <div className='col col-4'>
              { pageNumber === 1 ? 
                <button className='btn btn-outline-info' disabled>Previous</button>
                : 
                <button className='btn btn-outline-info'
                onClick={() => handlePageChange(pageNumber - 1)}>Previous</button>
              }


              { pageNumber >= Math.ceil(totalTasks / 5) ? 
                <button className='btn btn-outline-info' disabled>Next</button>
                :
                <button className='btn btn-outline-info'
                onClick={() => handlePageChange(pageNumber + 1)}>Next</button>
              }
              <span class="badge text-bg-secondary">Page: {pageNumber}</span>
            </div>
          </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default App;

