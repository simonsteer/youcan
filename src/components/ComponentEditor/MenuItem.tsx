import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { COLORS } from '../constants'
import Flex from '../Flex'

export interface MenuItemProps {
  title: string
  children: React.ReactNode
}

const MenuItem = ({ title, children }: MenuItemProps) => {
  const container = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [childrenHeight, setChildrenHeight] = useState(0)

  useEffect(() => {
    const scrollHeight: number = get(container, 'current.scrollHeight')
    if (scrollHeight) {
      setChildrenHeight(scrollHeight)
    }
  }, [container])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container isOpen={isOpen} childrenHeight={childrenHeight} ref={container}>
      <Header onClick={handleClick} justify="between">
        <h3>{title}</h3>
      </Header>
      {children}
    </Container>
  )
}

export default MenuItem

const Container = styled.div<{ isOpen: boolean; childrenHeight: number }>`
  transition: height 0.2s;
  background: ${COLORS.black};
  height: ${({ isOpen, childrenHeight }) => (isOpen ? childrenHeight : 48)}px;
  overflow: hidden;
`

const Header = styled(Flex)`
  height: 24px;
  margin: 12px;
  width: 100%;
  color: white;
  cursor: pointer;
`
