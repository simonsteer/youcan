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
  background?: string
  height?: string
  width?: string
  minHeight?: string
  minWidth?: string
  overflow?: 'hidden' | 'auto' | 'scroll' | 'visible'
  padding?: string
  margin?: string
  zIndex?: number
}

const Flex = styled.div.attrs<FlexProps>(
  ({
    background,
    height,
    width,
    minHeight,
    minWidth,
    overflow,
    padding,
    margin,
    zIndex,
  }: FlexProps) => ({
    style: {
      background,
      height,
      width,
      minHeight,
      minWidth,
      overflow,
      padding,
      margin,
      zIndex,
    },
  })
)`
  ${getFlexStyle}
`

export default Flex
