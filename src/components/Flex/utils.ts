import kebabCase from 'lodash/kebabCase'
import { FlexProps } from './Flex'

export const getStyle = (props: FlexProps) => `
  ${getFlexStyle(props)}
  ${getOtherStyle(props)}
`

const getOtherStyle = ({
  cursor,
  overflow,
  position,
  shadow,
  pointerEvents,
  hover,
}: FlexProps) => `
  ${createStyle({
    cursor,
    overflow,
    position,
    pointerEvents,
  })}
  ${createBoxShadowStyle(shadow)}
  ${createNestedStyle({ hover })}
`

const getFlexStyle = ({ flex, ...props }: FlexProps) => {
  const flexFlow = getFlow(props)
  const justifyContent = getJustification(props)
  const alignItems = getAlignment(props)

  return `
    display: flex;
    ${createStyle({ flex, flexFlow, justifyContent, alignItems })}
  `
}

const getFlow = ({ wrap, reverse, column }: FlexProps) => {
  const flexWrap = wrap ? 'wrap' : 'nowrap'
  const flexDirection = column ? 'column' : 'row'
  const flexFlow = reverse
    ? `${flexDirection}-reverse ${flexWrap}`
    : `${flexDirection} ${flexWrap}`
  return flexFlow
}

const getJustification = ({ justify, center }: FlexProps) => {
  if (center) {
    return 'center'
  }

  switch (justify) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'end':
      return 'flex-end'
    case 'around':
      return 'space-around'
    case 'between':
      return 'space-between'
    case 'even':
      return 'space-evenly'
    default:
      return 'flex-start'
  }
}

const getAlignment = ({ align, center }: FlexProps) => {
  if (center) {
    return 'center'
  }

  switch (align) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'end':
      return 'flex-end'
    case 'stretch':
      return 'stretch'
    case 'baseline':
      return 'baseline'
    default:
      return 'stretch'
  }
}

export interface BoxShadowConfig {
  offset?: {
    x: string
    y: string
  }
  blur: string
  spread: string
  color: string
}
export const createBoxShadowStyle = (shadow: BoxShadowConfig) => (shadow
    ? `box-shadow: ${shadow.offset.x} ${shadow.offset.y} ${shadow.blur} ${shadow.spread} ${shadow.color};`
    : '')

export const createStyle = (props: { [propName: string]: string | number }) => Object.keys(props)
    .map(createTransformStyleString(props))
    .join('\n')

const createNestedStyle = (props: { [propName: string]: string | number }) => Object.keys(props)
    .map(
      createTransformStyleString(
        props,
        ({ props, key }) => `&:${key} {
          ${props[key]}
        }`
      )
    )
    .join('\n')

const createTransformStyleString = <
  P extends { [propName: string]: string | number },
  K extends keyof P
>(
  props: P,
  transform = (params: { props: P; key: K }) => `${kebabCase(params.key as string)}: ${params.props[params.key]};`
) => (key: K) => (key && props[key]
    ? transform({
        props,
        key,
      })
    : '')
