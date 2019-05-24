import React from 'react'
import View, { Style } from './View'

const TEXT_TYPES = {
  heading: 'h2',
  body: 'p',
  link: 'a',
} as const

interface TextProps {
  type?: keyof typeof TEXT_TYPES
  children: string
  style?: Style
  onClick?: () => void
}

const Text = ({
  type = 'body',
  style = {},
  children = '',
  onClick,
}: TextProps) => (
  <View as={TEXT_TYPES[type]} style={style} onClick={onClick}>
    {children}
  </View>
)

export default Text
