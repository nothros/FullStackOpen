
require('express-async-errors');
const express = require('express');
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { errorHandler } = require('./util/middleware');

const blogsRouter = require('./controllers/blogs')


app.use(errorHandler)   
app.use(express.json())
app.use('/api/blogs', blogsRouter)


const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
  
  start()