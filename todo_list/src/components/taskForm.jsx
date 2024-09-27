import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function TaskForm({ currentTask, onSave, onCancel }) {
  
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [task, setTask] = useState({
    id: '',
    assigned_to: '',
    status: '',
    due_date: '',
    priority: '',
    comment: '',
  });

  useEffect(() => {
    if (currentTask) {
      setTask({
        id: currentTask.id || '',
        assigned_to: currentTask.assigned_to || '',
        status: currentTask.status || '',
        due_date: currentTask.due_date || getTodayDate(),
        priority: currentTask.priority || '',
        comment: currentTask.comment || '',
      });
    } else {
      setTask({
        id: '',
        assigned_to: '',
        status: '',
        due_date: getTodayDate(),
        priority: '',
        comment: '',
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        const today = new Date();
        const selectedDate = new Date(task.due_date);
        
        if (selectedDate < today) {
          toast.warning("Due date cannot be in the past.");
          return;
        }
    onSave(task);
  };

  return (
    <div className="task-form-container">
      <h2>{task.id ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="assigned_to">Assigned To</label>
              <input
                id="assigned_to"
                name="assigned_to"
                value={task.assigned_to}
                onChange={handleChange}
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="status">Status</label>
              <input
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="due_date">Due Date</label>
              <input
                id="due_date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
                type="date"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="priority">Priority</label>
              <input
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={task.comment}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          {task.id ? 'Update Task' : 'Add Task'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
