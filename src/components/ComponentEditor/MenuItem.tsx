import React, { useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants'
import Flex from '../Flex'

export interface MenuItemProps {
  title: string
  children: React.ReactNode
}

const MenuItem = ({ title, children }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <Container isOpen={isOpen}>
      <Header flex={1} justify="between" onClick={handleClick}>
        <h3>{title}</h3>
      </Header>
      {children}
    </Container>
  )
}

export default MenuItem

const Container = styled.div<{ isOpen: boolean }>`
  transition: max-height 0.3s;
  background: ${COLORS.black};
  height: auto;
  overflow: hidden;
`
// max-height: ${({ isOpen }) => (isOpen ? '500px' : '48px')};

const Header = styled(Flex)`
  background: ${COLORS.black};
  height: 48px;
  padding: 12px;
  width: 100%;
  color: white;
  cursor: pointer;
`
