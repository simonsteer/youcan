import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants'
import { Title, TitleProps, Paragraph } from '../../../Text'

const TITLE_HEIGHTS = { sm: 28, md: 40, lg: 52 } as const

interface EditorTitleBaseProps {
  size?: 'sm' | 'md' | 'lg'
}

const EditorTitleBase = styled(Title)<EditorTitleBaseProps>`
  cursor: pointer;
  height: ${({ size = 'md' }) => TITLE_HEIGHTS[size]}px;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${COLORS.grey};
  }
`

export interface EditorTitleProps extends TitleProps {
  shortcut?: React.ReactNode
}

const EditorTitle = ({ children, shortcut, ...props }: EditorTitleProps) => (
  <EditorTitleBase
    padding="0px 12px"
    justify="between"
    align="center"
    color={COLORS.white}
    {...props}
  >
    {children}
    {!!shortcut && (
    <Paragraph size="lg" color={COLORS.white}>
      {shortcut}
    </Paragraph>
      )}
  </EditorTitleBase>
  )

export default EditorTitle
