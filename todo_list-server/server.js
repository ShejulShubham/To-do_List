const express = require('express')
const cors = require('cors')
const utils = require('./utils')

const app = express()
app.use(cors())
app.use(express.json())

//middleware


//routes
const taskRouter = require('./routes/tasks')

app.use('/task', taskRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log(`server started on port 4000`)
})