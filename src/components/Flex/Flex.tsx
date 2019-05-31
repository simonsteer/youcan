import styled from 'styled-components'
import { getStyle } from './utils'

export interface FlexProps {
  flex?: number
  column?: boolean
  reverse?: boolean
  wrap?: boolean
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'even'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  center?: boolean
  height?: string
  width?: string
  minHeight?: string
  minWidth?: string
  overflow?: 'hidden' | 'auto' | 'scroll'
}

const Flex = styled.div<FlexProps>`
  ${getStyle}
`

export default Flex
