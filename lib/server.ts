import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './api'
import path from 'path'
import { error } from './middleware'

const PORT = 5000
const MONGODB_URI = 'mongodb://localhost:27017/fullstack-boilerplate'

const app = express()

app.use(bodyParser.json())
app.use(error)
app.use(cors())
app.use('/', [router, express.static(path.join(__dirname, '../../build'))])
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'))
})

app.listen(PORT, async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`Listening on ${PORT}`)
})
