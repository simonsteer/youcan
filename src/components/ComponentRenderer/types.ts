import { StyleObject } from '../View'

export type CustomComponentType = 'text' | 'box' | 'image'

export type CustomComponent = {
  type: CustomComponentType
  style?: StyleObject
  children: string | CustomComponent
}
