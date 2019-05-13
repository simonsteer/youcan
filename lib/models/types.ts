import { Document } from 'mongoose'
import { ValueInObject } from '../../global.types'
interface Schema {
  [key: string]: { type: any }
}

export type ModelSchema<T extends Schema> = {
  [key in keyof T]: ReturnType<ValueInObject<T>['type']>
}

export type SchemaType<T extends Schema> = ModelSchema<T> & Document
