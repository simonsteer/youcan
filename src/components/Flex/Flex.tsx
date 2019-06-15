import styled from 'styled-components'
import { MouseEventHandler, FocusEventHandler } from 'react'
import pick from 'lodash/pick'
import { getStyle } from './utils'
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
  borderColor?: string
  borderStyle?: string
  borderWidth?: string
  border?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  borderRadius?: string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  padding?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  margin?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  zIndex?: number
  transition?: string
  tabIndex?: number
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
  mergeStyleProps?: boolean
}

export interface FlexProps
  extends FlexTemplateProps,
    FlexAttributeProps,
    OtherFlexProps {}

const Flex = styled.div.attrs<FlexProps>(
  ({ mergeStyleProps, tabIndex, ...restProps }: FlexProps) => ({
    tabIndex,
    style: mergeStyleProps ? undefined : pick(restProps, FLEX_ATTRIBUTE_PROPS),
  })
)`
  ${getStyle}
`

Flex.defaultProps = {
  mergeStyleProps: true,
}

export default Flex
