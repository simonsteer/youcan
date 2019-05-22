import { Schema, Document, Model, model } from 'mongoose'
import { Moduleable } from '../services/moduleCreatorService'

export interface ModuleableFieldSchema {
  name: string
  type: Moduleable
  multi: boolean
  required: boolean
}

const ModuleableFieldSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  required: { type: Boolean, required: true },
})

export interface ModuleableSchema {
  name: string
  fields: ModuleableFieldSchema[]
  application_id: typeof Schema.Types.ObjectId
}

const schema: Schema = new Schema({
  application_id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  fields: [ModuleableFieldSchema],
})

export interface ModuleableDocument extends Document, ModuleableSchema {}

export interface IModuleable extends ModuleableDocument {}

schema.pre('save', function(this: ModuleableDocument, next) {
  const { name, application_id } = this
  Moduleable.findOne({ name, application_id }, (_, doc) => {
    if (!doc) {
      next()
    } else {
      next(new Error(`Moduleable with name ${name} already exists`))
    }
  })
})

export interface ModuleableModel extends Model<IModuleable> {}

const Moduleable: ModuleableModel = model<IModuleable, ModuleableModel>(
  'Moduleable',
  schema
)

export default Moduleable
