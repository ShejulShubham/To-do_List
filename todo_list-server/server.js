const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())



//routes
const taskRouter = require('./routes/task')

app.use('/task', taskRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log(`server started on port 4000`)
})