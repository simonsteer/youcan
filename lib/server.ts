import express, { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './api'
import path from 'path'

const PORT = 5000
const MONGODB_URI = 'mongodb://localhost:27017/fullstack-boilerplate'

const app = express()

app.use(bodyParser.json())

const errorHandler: ErrorRequestHandler = (_error, _, res, next) => {
  if (_error) {
    res.status(500).json({
      error: _error.toString(),
    })
  }
  next()
}

app.use(errorHandler)

app.use('/', [router, express.static(path.join(__dirname, '../../build'))])

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'))
})

app.listen(PORT, async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`Listening on ${PORT}`)
})
