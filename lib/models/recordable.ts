import { Schema, Document, Model, model } from 'mongoose'
import { Recordable } from '../services/recordCreatorService'

export interface RecordableFieldSchema {
  name: string
  type: Recordable
  multi: boolean
  required: boolean
}

const RecordableFieldSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  multi: { type: Boolean, required: true },
  required: { type: Boolean, required: true },
})

export interface RecordableSchema {
  name: string
  fields: RecordableFieldSchema[]
  application_id: string
}

const schema: Schema = new Schema({
  application_id: { type: String, required: true },
  name: { type: String, required: true },
  fields: [RecordableFieldSchema],
})

export interface RecordableDocument extends Document, RecordableSchema {}

export interface IRecordable extends RecordableDocument {}

schema.pre('save', function(this: RecordableDocument, next) {
  const { name, application_id } = this
  Recordable.findOne({ name, application_id }, (_, doc) => {
    if (!doc) {
      next()
    } else {
      next(new Error(`Recordable with name ${name} already exists`))
    }
  })
})

export interface RecordableModel extends Model<IRecordable> {}

const Recordable: RecordableModel = model<IRecordable, RecordableModel>(
  'Recordable',
  schema
)

export default Recordable
