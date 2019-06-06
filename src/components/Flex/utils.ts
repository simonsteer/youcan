import { FlexProps } from './Flex'

export const getStyle = ({
  height = 'auto',
  width = 'auto',
  minHeight = 'auto',
  minWidth = 'auto',
  overflow = 'auto',
  background = 'transparent',
  padding,
  margin,
  position,
  ...flexProps
}: FlexProps) => {
  const paddingStyle = padding ? `padding: ${padding};` : '' 
  const marginStyle = margin ? `margin: ${margin};` : '' 
  const positionStyle = position ? `position: ${position};` : '' 

  return `
    ${getFlexStyle(flexProps)}
    height: ${height};
    width: ${width};
    min-height: ${minHeight};
    min-width: ${minWidth};
    overflow: ${overflow};
    background: ${background};
  ` + paddingStyle + marginStyle
}

export const getFlexStyle = ({ flex, ...props }: FlexProps) => {
  const flexFlow = getFlow(props)
  const justifyContent = getJustification(props)
  const alignItems = getAlignment(props)
  const flexAmount = typeof flex === 'number' ? flex : '1'

  return `
    display: flex;
    flex: ${flexAmount};
    flex-flow: ${flexFlow};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `
}

export const getFlow = ({ wrap, reverse, column }: FlexProps) => {
  const flexWrap = wrap ? 'wrap' : 'nowrap'
  const flexDirection = column ? 'column' : 'row'
  const flexFlow = reverse
    ? `${flexDirection}-reverse ${flexWrap}`
    : `${flexDirection} ${flexWrap}`
  return flexFlow
}

export const getJustification = ({ justify, center }: FlexProps) => {
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

export const getAlignment = ({ align, center }: FlexProps) => {
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
