import { Schema, Document, Model, model } from 'mongoose'

export interface ApplicationSchema {
  name: string
}

export interface ApplicationDocument extends Document, ApplicationSchema {}

export interface IApplication extends ApplicationDocument {}

const schema: Schema = new Schema({
  name: { type: String, required: true },
})

export interface ApplicationModel extends Model<IApplication> {}
const Application: ApplicationModel = model<IApplication, ApplicationModel>(
  'Application',
  schema
)

export default Application
