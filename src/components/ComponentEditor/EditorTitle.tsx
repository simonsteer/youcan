import React from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import { COLORS } from '../constants'

const TITLE_SIZES = {
  FONT: { md: 18, lg: 24 },
  CONTAINER: { md: 32, lg: 48 },
} as const

export interface EditorTitleProps {
  size: 'md' | 'lg'
}

const EditorTitle = styled(Flex)<EditorTitleProps>`
  cursor: pointer;
  color: ${COLORS.white};
  font-size: ${({ size }) => TITLE_SIZES.FONT[size]}px;
  height: ${({ size }) => TITLE_SIZES.CONTAINER[size]}px;
  font-weight: bold;
`

export default ({ title, size = 'md' }: { title: string, size?: EditorTitleProps['size'] }) => <EditorTitle justify="between" align="center" size={size}>{title}</EditorTitle>