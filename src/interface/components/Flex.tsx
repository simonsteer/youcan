import React from 'react'
import styled from 'styled-components'

interface FlexProps {
  flex?: number
  column?: boolean
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
  flex,
  column = false,
  reverse = false,
  wrap = false,
  justify,
  align,
}: FlexProps) => {
  const flexAmount = flex ? `flex: ${flex};` : ''
  const flexDirection = column ? 'flex-direction: column' : ''
  const flexFlow = reverse ? `${flexDirection}-reverse;` : `${flexDirection};`
  const flexWrap = wrap ? `flex-wrap: wrap;` : ''
  const justifyContent = justify ? `justify-content: ${justify};` : ''
  const alignItems = align ? `align-items: ${align};` : ''

  return styled.div`
    display: flex;
    ${flexAmount}
    ${flexFlow}
    ${justifyContent}
    ${alignItems}
    ${flexWrap}
  `
}

export default Flex
