export interface StyleObject {
  [key: string]: string | number
}
export type StyleArray = (StyleObject | StyleObject[])[]
export type Style = StyleObject | StyleArray

export interface ViewProps {
  inlineStyle?: StyleObject
  style?: any
  children?: React.ReactNode
  [key: string]: any
}
