import { Schema, Document, Model, model } from 'mongoose'
import { Moduleable } from '../../src/components/EditingInterface/ModelCreator/constants'

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

export interface ModuleableModel extends Model<IModuleable> {}

const Moduleable: ModuleableModel = model<IModuleable, ModuleableModel>(
  'Moduleable',
  schema
)

export default Moduleable
