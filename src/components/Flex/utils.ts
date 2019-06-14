import kebabCase from 'lodash/kebabCase'
import pick from 'lodash/pick'
import { FlexProps } from './Flex'
import { FLEX_ATTRIBUTE_PROPS } from './constants'

export const getStyle = (props: FlexProps) => `
  ${getFlexStyle(props)}
  ${getOtherStyle(props)}
  ${getAttributeStyle(props)}
`

const getOtherStyle = ({
  cursor,
  overflow,
  position,
  pointerEvents,
  hover,
}: FlexProps) => `
  ${createStyle({
    cursor,
    overflow,
    position,
    pointerEvents,
  })}
  ${createNestedStyle({ hover })}
`

const getAttributeStyle = ({ ignoreAttrs, ...restProps }: FlexProps) => (ignoreAttrs ? `${createStyle(pick(restProps, FLEX_ATTRIBUTE_PROPS))}` : '')

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
export const createBoxShadowStyle = (shadow: BoxShadowConfig) => (shadow && shadow.color !== 'transparent'
    ? `${shadow.offset.x} ${shadow.offset.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`
    : '')

export const createStyle = (props: CreateStyleObject) => Object.keys(props)
    .map(createTransformStyle(props))
    .join('\n')

export const createNestedStyle = (props: {
  [property: string]: { [property: string]: string }
}) => Object.keys(props)
    .map(
      createTransformStyle(
        props,
        ({ props, key }) => `&:${key} {
          ${createStyle(props[key])}
        }`
      )
    )
    .join('\n')

const createTransformStyle = <P extends CreateStyleObject, K extends keyof P>(
  props: P,
  transform = (params: { props: P; key: K }) => `${kebabCase(params.key as string)}: ${params.props[params.key]};`
) => (key: K) => (key && props[key]
    ? transform({
        props,
        key,
      })
    : '')

interface CreateStyleObject {
  [property: string]: string | number | { [property: string]: string }
}
