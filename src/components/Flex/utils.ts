import kebabCase from 'lodash/kebabCase'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import { FlexProps } from './Flex'
import { FLEX_ATTRIBUTE_PROPS } from './constants'

export const getStyle = (props: FlexProps) => `
  ${getFlexStyle(props)}
  ${getAttributeStyle(props)}
  ${getOtherStyle(props)}
`

const getOtherStyle = ({
  cursor,
  overflow,
  position,
  pointerEvents,
  hover,
  focus,
  after,
  before,
}: FlexProps) => `
  ${createStyle({
    cursor,
    overflow,
    position,
    pointerEvents,
  })}
  ${createNestedStyle({
    hover,
    focus,
  })}
  ${
    before
      ? `&::before {
        content: '';
    ${createStyle(before)}
  }`
      : ''
  }
  ${
    after
      ? `&::after {
        content: '';
    ${createStyle(after)}
  }`
      : ''
  }
`

const getAttributeStyle = ({ mergeStyleProps, ...flexProps }: FlexProps) => {
  let cachedProps = {}
  let cachedResult = ''

  const attributeProps = pick(flexProps, FLEX_ATTRIBUTE_PROPS)

  if (isEqual(cachedProps, attributeProps)) {
    return cachedResult
  }
    const attributeStyle = mergeStyleProps ? createStyle(attributeProps) : ''
    cachedProps = attributeProps
    cachedResult = attributeStyle
    return attributeStyle
}

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

export const createStyle = (
  props: CreateStyleObject,
  transform = createStyleTransform(props)
) => Object.keys(props)
    .map(transform)
    .join('\n')

export const createNestedStyle = (props: {
  [property: string]: { [property: string]: string }
}) => Object.keys(props)
    .map(
      createStyleTransform(
        props,
        ({ props, key }) => `&:${key} {
          ${createStyle(props[key])}
        }`
      )
    )
    .join('\n')

const createStyleTransform = <P extends CreateStyleObject, K extends keyof P>(
  props: P,
  transform = (params: { props: P; key: K }) => `${kebabCase(params.key as string)}: ${params.props[params.key]};`
) => (key: K) => (key && props[key]
    ? transform({
        props,
        key,
      })
    : '')

interface CreateStyleObject {
  [property: string]: string | number | CreateStyleObject
}
