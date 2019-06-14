import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants'
import { Title, TitleProps, Paragraph } from '../../../Text'

const TITLE_HEIGHTS = { sm: 28, md: 40, lg: 52 } as const

interface EditorTitleBaseProps {
  size?: 'sm' | 'md' | 'lg'
}

const EditorTitleBase = styled(Title)<EditorTitleBaseProps>`
  height: ${({ size = 'md' }) => TITLE_HEIGHTS[size]}px;
`

export interface EditorTitleProps extends TitleProps {
  shortcut?: React.ReactNode
}

const EditorTitle = ({ children, shortcut, ...props }: EditorTitleProps) => (
  <EditorTitleBase
    cursor="pointer"
    padding="0px 12px"
    justify="between"
    align="center"
    color={COLORS.black}
    {...props}
  >
    {children}
    {!!shortcut && (
      <Paragraph size="lg" color={COLORS.black}>
        {shortcut}
      </Paragraph>
    )}
  </EditorTitleBase>
)

export default EditorTitle
