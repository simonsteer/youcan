import styled from 'styled-components'
import { MouseEventHandler, FocusEventHandler } from 'react'
import pick from 'lodash/pick'
import { getStyle, createStyle } from './utils'
import { FLEX_ATTRIBUTE_PROPS } from './constants'

// use these props in styled-component template string
interface FlexTemplateProps {
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
  pointerEvents?: 'none' | 'auto'
  hover?: { [property: string]: string }
}

// use these props in attrs
interface FlexAttributeProps {
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
  borderColor?: string
  borderStyle?: string
  borderWidth?: string
  boxShadow?: string
}

// handlers
interface FlexHandlerProps {
  onClick?: MouseEventHandler
  onHover?: MouseEventHandler
  onMouseOut?: MouseEventHandler
  onMouseOver?: MouseEventHandler
  onMouseDown?: MouseEventHandler
  onMouseUp?: MouseEventHandler
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
}

interface OtherFlexProps extends FlexHandlerProps {
  ignoreAttrs?: boolean
}

export interface FlexProps
  extends FlexTemplateProps,
    FlexAttributeProps,
    OtherFlexProps {}

const Flex = styled.div.attrs<FlexProps>(
  ({ ignoreAttrs, tabIndex, ...restProps }: FlexProps) => ({
    tabIndex,
    style: ignoreAttrs ? {} : pick(restProps, FLEX_ATTRIBUTE_PROPS),
  })
)`
  ${getStyle}
`

export default Flex
