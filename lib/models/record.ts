import { Schema, Document, Model, model } from 'mongoose'

export interface RecordSchema {
  name: string
  data: { [field: string]: any }
  application_id: string
}

const schema = new Schema({
  name: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  application_id: { type: String, required: true },
})

export interface RecordDocument extends Document, RecordSchema {}

export interface IRecord extends RecordDocument {}

export interface RecordModel extends Model<IRecord> {}

const Record: RecordModel = model<IRecord, RecordModel>('Model', schema)

export default Record
