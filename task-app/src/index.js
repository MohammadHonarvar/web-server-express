const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Parsing body of requests
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, _ => {
  console.log(`Server is up on port ${port}`)
})
