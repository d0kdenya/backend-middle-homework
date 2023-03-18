require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes/indexRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(express.json())

app.use('/api', indexRouter)

app.use(errorMiddleware)

async function start(PORT, URLDB) {
  try {
    await mongoose.connect(URLDB)
    app.listen(PORT, () => console.log(`Server started on ${ PORT } port!`))
  } catch (e) {
    console.log(e)
  }
}

const URLDB = process.env.URLDB
const PORT = process.env.PORT || 3000

start(PORT, URLDB)