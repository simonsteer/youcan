import styled from 'styled-components'
import { getFlexStyle } from './utils'

export interface FlexProps {
  flex?: number
  column?: boolean
  reverse?: boolean
  wrap?: boolean
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'even'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  center?: boolean
}

const Flex = styled.div<FlexProps>`
  ${getFlexStyle}
`

export default Flex
