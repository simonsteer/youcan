import { ValueInObject } from '../../../../global.types'

export const MODULEABLE_TYPES = {
  phone: Number,
  date: String,
  text: String,
  email: String,
  address: String,
  creditCardNumber: Number,
  hyperlink: String,
  price: Number,
  model: String,
} as const

export type ModuleableConfigs = typeof MODULEABLE_TYPES

export type Moduleable = keyof typeof MODULEABLE_TYPES
