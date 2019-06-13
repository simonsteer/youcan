import styled from 'styled-components'
import { MouseEventHandler, FocusEventHandler } from 'react'
import { getFlexStyle, getOtherStyle } from './utils'

export interface FlexProps {
  // use these props in styled-component template string
  flex?: number
  column?: boolean
  reverse?: boolean
  wrap?: boolean
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'even'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  center?: boolean
  cursor?:
    | 'pointer'
    | 'crosshair'
    | 'auto'
    | 'grab'
    | 'grabbing'
    | 'help'
    | 'move'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'progress'
    | 'row-resize'
    | 'col-resize'
    | 'text'
  overflow?: 'hidden' | 'auto' | 'scroll' | 'visible'
  position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky'
  // use these props in attrs
  background?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  border?: string
  height?: string
  width?: string
  minHeight?: string
  minWidth?: string
  padding?: string
  margin?: string
  zIndex?: number
  transition?: string
  tabIndex?: number
  borderRadius?: string
  // handlers
  onClick?: MouseEventHandler
  onHover?: MouseEventHandler
  onMouseOut?: MouseEventHandler
  onMouseOver?: MouseEventHandler
  onMouseDown?: MouseEventHandler
  onMouseUp?: MouseEventHandler
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
}

const Flex = styled.div.attrs<FlexProps>(
  ({
    tabIndex,
    background,
    height,
    width,
    minHeight,
    minWidth,
    padding,
    margin,
    zIndex,
    transition,
    borderRadius,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
  }: FlexProps) => ({
    tabIndex,
    style: {
      background,
      height,
      width,
      minHeight,
      minWidth,
      padding,
      margin,
      zIndex,
      transition,
      borderRadius,
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
    },
  })
)`
  ${getFlexStyle}
  ${getOtherStyle}
`

export default Flex
