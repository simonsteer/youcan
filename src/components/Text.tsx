import React from 'react'
import styled from 'styled-components'
import { COLORS } from './constants'
import Flex from './Flex'
import { FlexProps } from './Flex/Flex'

const TEXT_CONFIGS = {
  title: {
    sm: {
      fontSize: '16px',
    },
    md: {
      fontSize: '20px',
    },
    lg: {
      fontSize: '28px',
    },
  },
  paragraph: {
    sm: {
      fontSize: '10px',
    },
    md: {
      fontSize: '12px',
    },
    lg: {
      fontSize: '14px',
    },
  },
} as const

export interface TextProps {
  type?: 'title' | 'paragraph'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  weight?: 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  italic?: boolean
  variant?: 'small-caps'
  letterSpacing?: number
  children: React.ReactNode
}

const Text = styled(Flex)<TextProps>`
  ${({
    type = 'paragraph',
    size = 'md',
    color = COLORS.black,
    weight,
    italic,
    variant,
    letterSpacing,
  }) => `
    font-size: ${TEXT_CONFIGS[type][size].fontSize};
    ${weight ? `font-weight: ${weight};` : ''}
    ${italic ? 'font-style: italic;' : ''}
    ${variant ? `font-variant: ${variant};` : ''}
    ${letterSpacing ? `letter-spacing: ${letterSpacing}px;` : ''}
    color: ${color};
  `}
`

export default Text

type CustomTextProps = Pick<TextProps, Exclude<keyof TextProps, 'type'>> &
  FlexProps

export type TitleProps = CustomTextProps
export const Title = ({ children, ...restProps }: TitleProps) => (
  <Text as="h2" type="title" {...restProps}>
    {children}
  </Text>
)

export type ParagraphProps = CustomTextProps
export const Paragraph = ({ children, ...restProps }: ParagraphProps) => (
  <Text as="p" {...restProps}>
    {children}
  </Text>
)
