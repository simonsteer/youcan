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

interface EditorTitleComponentProps { title: string, size?: EditorTitleProps['size']; onClick?: () => void }

export default ({ title, size = 'md', onClick }: EditorTitleComponentProps) => <EditorTitle justify="between" align="center" onClick={onClick} size={size}>{title}</EditorTitle>