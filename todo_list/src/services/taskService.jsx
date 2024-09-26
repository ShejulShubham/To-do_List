let tasks = [];

export const getTasks = () => Promise.resolve([...tasks]);

export const addTask = (task) => {
  task.id = Date.now();
  tasks.push(task);
  return Promise.resolve(task);
};

export const updateTask = (updatedTask) => {
  tasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  return Promise.resolve(updatedTask);
};

export const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  return Promise.resolve();
};
