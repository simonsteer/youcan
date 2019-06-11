import React from 'react'
import styled from 'styled-components'
import Flex from '../../Flex'
import { COLORS } from '../../constants'

const TITLE_SIZES = {
  FONT: { md: 18, lg: 24 },
  CONTAINER: { md: 32, lg: 48 },
} as const

export interface EditorTitleProps {
  size: 'md' | 'lg'
  useRegularCursor?: boolean
}

const EditorTitle = styled(Flex)<EditorTitleProps>`
  cursor: ${({ useRegularCursor }) =>
    useRegularCursor ? 'default' : 'pointer'};
  color: ${COLORS.white};
  font-size: ${({ size }) => TITLE_SIZES.FONT[size]}px;
  height: ${({ size }) => TITLE_SIZES.CONTAINER[size]}px;
  font-weight: bold;
  font-style: italic;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${COLORS.grey};
  }
  padding: 0px 12px;
`

interface EditorTitleComponentProps {
  title: string
  children?: React.ReactNode
  size?: EditorTitleProps['size']
  onClick?: () => void
  useRegularCursor?: boolean
}

export default ({
  title,
  children,
  size = 'md',
  onClick,
  useRegularCursor = false,
}: EditorTitleComponentProps) => (
  <EditorTitle
    useRegularCursor={useRegularCursor}
    justify="between"
    align="center"
    onClick={onClick}
    size={size}
  >
    {title}
    {children}
  </EditorTitle>
)
