const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12733870',
    password: '2jVE2lKImV',
    port: 3306,
    database: 'sql12733870',
    connectionLimit: 10,
})

module.exports = {
    pool,
}