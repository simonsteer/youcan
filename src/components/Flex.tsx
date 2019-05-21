import React from 'react'
import View, { ViewProps } from './View'

export interface FlexProps extends ViewProps {
  flex?: number | string
  column?: boolean
  inline?: boolean
  reverse?: boolean
  wrap?: boolean
  justify?:
    | 'space-between'
    | 'space-around'
    | 'flex-end'
    | 'flex-start'
    | 'center'
    | 'space-evenly'
  align?: 'flex-end' | 'flex-start' | 'center' | 'stretch' | 'baseline'
}

const Flex = ({
  flex = '0 1 auto',
  column = false,
  inline = false,
  reverse = false,
  wrap = false,
  justify = 'flex-start',
  align = 'stretch',
  style = {},
  children = null,
  ...restProps
}: FlexProps) => {
  const flexDirection = column ? 'column' : 'row'
  const flexFlow = reverse ? `${flexDirection}-reverse` : `${flexDirection}`

  const flexStyle = {
    ...style,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: flexFlow,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    justifyContent: justify,
    alignItems: align,
  }

  return (
    <View style={[flexStyle, style]} {...restProps}>
      {children}
    </View>
  )
}

export default Flex
