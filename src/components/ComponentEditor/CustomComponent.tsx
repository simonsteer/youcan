import React from 'react'
import Flex, { FlexProps } from '../Flex/Flex'

export interface CustomComponentProps {
  props: FlexProps
  children?: CustomComponentProps[]
}

const CustomComponent = ({ props, children = [] }: CustomComponentProps) => (
  <Flex {...props}>{children.map(CustomComponent)}</Flex>
)

export default CustomComponent
