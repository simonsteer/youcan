import React from 'react'
import styled from 'styled-components'
import { reduceStyles } from './utils'
import { Style, ViewProps } from './types'

const StyledView = styled.div`
  ${({ _style: style = {} }: { _style: Style }) => reduceStyles(style)}
`

const View = ({ style = {}, inlineStyle = {}, ...restProps }: ViewProps) => (
  <StyledView _style={style} style={inlineStyle} {...restProps} />
)

export default View
