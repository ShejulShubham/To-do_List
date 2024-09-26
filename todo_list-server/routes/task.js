const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()


router.get('/all', (request, response) => {
    const { page } = request.query
    const limit = 5
    const offset = (page - 1) * limit
    const statement = `SELECT id, assigned_to, status, due_date, priority, comment FROM task
    ORDER BY id
    LIMIT ? OFFSET ?;`

    db.pool.query(statement, [limit, offset], (error, tasks) => {
        if (error) {
            response.send(utils.createResult(error, null));
        } else {
            const formattedTasks = tasks.map((task) => ({
                ...task,
                due_date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : null,
            }));
            response.send(utils.createResult(null, formattedTasks));
        }
    });
})


router.post('/add', (request, response) => {
    const { assigned_to, status, due_date, priority, comment } = request.body
    const statement = `INSERT INTO task(assigned_to, status, due_date, priority, comment) VALUES
    (?, ?, ?, ?, ?);`

    db.pool.execute(statement, [assigned_to, status, due_date, priority, comment], (error, result) => {
        response.send(utils.createResult(error, result))
    })
})

router.put('/update', (request, response) =>{
    const { id, assigned_to, status, due_date, priority, comment } = request.body
    const statement = `UPDATE task SET
    assigned_to = ?,
    status = ?,
    due_date = ?,
    priority = ?,
    comment = ?
    WHERE id = ?;`

    db.pool.execute(statement, [assigned_to, status, due_date, priority, comment, id],
        (error, result) => {
        response.send(utils.createResult(error, result))
    })
})


router.delete('/delete', (request, response) => {
    const { id } = request.query
    const statement = `DELETE FROM task WHERE id = ?;`

    db.pool.execute(statement, [id], (error, result) => {
        response.send(utils.createResult(error, result))
    })
})


module.exports = router