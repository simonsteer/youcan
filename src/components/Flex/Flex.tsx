import styled from 'styled-components'
import { getFlexStyle } from './utils'
import omit from 'lodash/omit'

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
  transition?: string
}

const Flex = styled.div.attrs<FlexProps>((props: FlexProps) => ({
  style: omit(props, [
    'flex',
    'column',
    'reverse',
    'wrap',
    'justify',
    'align',
    'center',
  ]),
}))`
  ${getFlexStyle}
`

export default Flex
