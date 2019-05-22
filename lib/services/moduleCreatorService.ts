import Module, { ModuleSchema, IModule } from '../models/module'
import Moduleable, { ModuleableSchema } from '../models/moduleable'
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

export type ModuleableConfigs = typeof MODULEABLE_TYPES
export type Moduleable = keyof typeof MODULEABLE_TYPES
export type ModuleableConstructor = ValueInObject<typeof MODULEABLE_TYPES>

export default class ModuleCreatorService {
  moduleable: ModuleableSchema
  data: ModuleSchema['data']

  constructor(moduleable: ModuleableSchema, data: ModuleSchema['data']) {
    this.moduleable = moduleable
    this.data = data
  }

  public process() {
    const verification = this.verifyProvidedData()
    return verification instanceof Error ? verification : this.createModule()
  }

  private verifyProvidedData() {
    const { fields, name } = this.moduleable

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

  private createModuleData = () =>
    this.moduleable.fields.reduce(
      (data, { name }) => {
        data[name] = this.data[name]
        return data
      },
      {} as ModuleSchema['data']
    )

  private createModule = () =>
    new Module({
      name: this.moduleable.name,
      data: this.createModuleData(),
    })
}
