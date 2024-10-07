const express = require('express');
const fs = require('fs');
const path = require('path');
const utils = require('../utils');

const router = express.Router();
const filePath = path.join(__dirname, 'Tasks.json'); // File to store tasks in JSON format

// Function to read tasks from the file
const readTasksFromFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const tasks = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(tasks);
};

// Function to write tasks to the file
const writeTasksToFile = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Route to get all tasks (with pagination)
router.get('/all', (request, response) => {
    const { page = 1 } = request.query; // Default page 1 if not provided
    const limit = 5;
    const offset = (page - 1) * limit;

    const tasks = readTasksFromFile();
    const paginatedTasks = tasks.slice(offset, offset + limit);
    const totalTasks = tasks.length;

    response.send(utils.createResult(null, { formattedTasks: paginatedTasks, totalTasks }));
});

// Route to add a new task
router.post('/add', (request, response) => {
    const { assigned_to, status, due_date, priority, comment } = request.body;

    const tasks = readTasksFromFile();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, // Auto-increment ID
        assigned_to,
        status,
        due_date: due_date ? new Date(due_date).toISOString().split('T')[0] : null,
        priority,
        comment
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);

    response.send(utils.createResult(null, newTask));
});

// Route to update a task
router.put('/update', (request, response) => {
    const { id, assigned_to, status, due_date, priority, comment } = request.body;

    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === Number(id));
    if (taskIndex === -1) {
        return response.send(utils.createResult('Task not found', null));
    }

    tasks[taskIndex] = {
        id: Number(id),
        assigned_to,
        status,
        due_date: due_date ? new Date(due_date).toISOString().split('T')[0] : null,
        priority,
        comment
    };

    writeTasksToFile(tasks);
    response.send(utils.createResult(null, tasks[taskIndex]));
});

// Route to delete a task
router.delete('/delete', (request, response) => {
    const { id } = request.query;

    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === Number(id));
    if (taskIndex === -1) {
        return response.send(utils.createResult('Task not found', null));
    }

    tasks.splice(taskIndex, 1); // Remove task
    writeTasksToFile(tasks);
    response.send(utils.createResult(null, { message: 'Task deleted' }));
});

module.exports = router;
