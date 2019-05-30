export type Justify = 'start' | 'center' | 'end' | 'around' | 'between' | 'even'
export type Align = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

export interface FlexProps {
  flex?: number
  column?: boolean
  reverse?: boolean
  wrap?: boolean
  justify?: Justify
  align?: Align
  center?: boolean
}
