import React, { useState, useEffect } from 'react';

const TaskForm = ({ currentTask, onSave }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: currentTask?.id, title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
