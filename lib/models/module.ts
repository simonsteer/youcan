import { Schema, Document, Model, model } from 'mongoose'

export interface ModuleSchema {
  name: string
  data: { [field: string]: any }
  moduleable_id: typeof Schema.Types.ObjectId
}

const schema = new Schema({
  name: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  moduleable_id: { type: Schema.Types.ObjectId },
})

export interface ModuleDocument extends Document, ModuleSchema {}

export interface IModule extends ModuleDocument {}

export interface ModuleModel extends Model<IModule> {}

const Module: ModuleModel = model<IModule, ModuleModel>('Model', schema)

export default Module
