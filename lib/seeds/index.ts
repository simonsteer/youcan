import mongoose from 'mongoose'
import * as Models from '../models'
import userSeeds from './user'

const uri = 'mongodb://localhost:27017/fullstack-boilerplate'

const allSeeds = [...userSeeds]

const createSeeds = async () => {
  await mongoose.connect(uri)

  await Promise.all(Object.values(Models).map(Model => Model.deleteMany({})))

  await Promise.all(allSeeds.map(doc => doc.save()))

  await mongoose.connection.close()
}

createSeeds()
