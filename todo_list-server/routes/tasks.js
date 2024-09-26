const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()


router.post('/register', (request, response) => {
    const { fullName, email, password, phone } = request.body
    const statement = `INSERT INTO users(full_name, email, Password, phone)
    VALUES(?, ?, ?, ?);`
    const encryptedPassword = String(crypto.SHA256(password))
    db.pool.execute(
        statement,
        [fullName, email, encryptedPassword, phone],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

router.get('/login', (request, response) => {
    const { email, password } = request.body
    const statement = `SELECT id, full_name, email, phone, create_time FROM users
    WHERE email = ? and password = ?;`
    const encryptedPassword = String(crypto.SHA256(password))
    db.pool.query(statement, [email, encryptedPassword], (error, users) => {
        if(error) {
            response.send(utils.createErrorResult(error))
        } else {
            if(users.length == 0) {
                response.send(utils.createErrorResult('user does not exist!!!'))
            } else {
                const user = users[0]
                
                response.send(utils.createSuccessResult(user))
            }

        }
    })
})

router.put('/profile/', (request, response) => {
    const { fullName, phone, userId} = request.body
    const statement = `UPDATE users SET full_name = ?, phone = ? 
    WHERE id = ?;`
    db.pool.execute(
        statement,
        [fullName, phone, userId],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})


module.exports = router