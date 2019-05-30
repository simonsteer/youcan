import React from 'react'
import styled from 'styled-components'
import { FlexProps } from './types'
import { getFlexStyle } from './utils'

const Flex = styled.div<FlexProps>`
  ${getFlexStyle}
`

export default Flex
