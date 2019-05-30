import Record, { RecordSchema, IRecord } from '../models/record'
import Recordable, { RecordableSchema } from '../models/recordable'
import { ValueInObject } from '../../global.types'

export const MODULEABLE_TYPES = {
  phone: Number,
  date: String,
  text: String,
  email: String,
  address: String,
  credit_card_number: Number,
  url: String,
  price: Number,
  model: String,
} as const

export type RecordableConfigs = typeof MODULEABLE_TYPES
export type Recordable = keyof typeof MODULEABLE_TYPES
export type RecordableConstructor = ValueInObject<typeof MODULEABLE_TYPES>

export default class RecordCreatorService {
  recordable: RecordableSchema
  data: RecordSchema['data']

  constructor(recordable: RecordableSchema, data: RecordSchema['data']) {
    this.recordable = recordable
    this.data = data
  }

  public process() {
    const verification = this.verifyProvidedData()
    return verification instanceof Error ? verification : this.createRecord()
  }

  private verifyProvidedData() {
    const { fields, name } = this.recordable

    const requiredFields = fields.filter(({ required }) => required)
    const missingRequiredFields = requiredFields.filter(
      ({ name }) => this.data[name] === null || this.data[name] === undefined
    )

    if (missingRequiredFields.length > 0) {
      return new Error(
        `${name} requires the following fields: ${missingRequiredFields.join(
          ', '
        )}`
      )
    }

    const fieldsWithIncorrectDataTypes = fields.filter(
      ({ name, type, required }) => {
        const providedData = this.data[name]
        if (providedData === null || providedData === undefined) {
          return false
        }

        const requiredContructor = MODULEABLE_TYPES[type]
        return requiredContructor.name !== providedData.constructor.name
      }
    )

    if (fieldsWithIncorrectDataTypes.length > 0) {
      return new Error(
        `The following fields are not the correct data type: ${fieldsWithIncorrectDataTypes.join(
          ', '
        )}`
      )
    }

    return true
  }

  private createRecordData = () =>
    this.recordable.fields.reduce(
      (data, { name }) => {
        data[name] = this.data[name]
        return data
      },
      {} as RecordSchema['data']
    )

  private createRecord = () =>
    new Record({
      name: this.recordable.name,
      data: this.createRecordData(),
      application_id: this.recordable.application_id,
    })
}
