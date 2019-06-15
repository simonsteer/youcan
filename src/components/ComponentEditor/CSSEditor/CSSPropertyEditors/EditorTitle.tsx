import React from 'react'
import { COLORS } from '../../../constants'
import { Title, TitleProps, Paragraph } from '../../../Text'
import Flex from '../../../Flex'
import { FlexProps } from '../../../Flex/Flex'

const TITLE_HEIGHTS = { sm: 28, md: 40, lg: 52 } as const

export interface EditorTitleProps extends FlexProps {
  shortcut?: React.ReactNode
  size?: TitleProps['size']
  children: string
}

const EditorTitle = ({
  children,
  shortcut,
  size = 'md',
  ...flexProps
}: EditorTitleProps) => (
  <Flex
    as="button"
    cursor="pointer"
    padding="0px 12px"
    justify="between"
    align="center"
    color={COLORS.black}
    height={`${TITLE_HEIGHTS[size]}px`}
    tabIndex={0}
    {...flexProps}
  >
    <Title size={size}>{children}</Title>
    {!!shortcut && (
      <Paragraph size="lg" color={COLORS.black}>
        {shortcut}
      </Paragraph>
    )}
  </Flex>
)

export default EditorTitle
