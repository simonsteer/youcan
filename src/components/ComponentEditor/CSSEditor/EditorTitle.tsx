import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants'
import { Title, TitleProps } from '../../Text'

const TITLE_HEIGHTS = { sm: 28, md: 40, lg: 52 } as const

export interface EditorTitleProps {
  size?: 'sm' | 'md' | 'lg'
}

const EditorTitle = styled(Title)<EditorTitleProps>`
  cursor: pointer;
  height: ${({ size = 'md' }) => TITLE_HEIGHTS[size]}px;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${COLORS.grey};
  }
`

export default (props: TitleProps) => (
  <EditorTitle
    padding="0px 12px"
    justify="between"
    align="center"
    color={COLORS.white}
    {...props}
  />
)
