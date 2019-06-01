import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { COLORS } from '../constants'
import Flex from '../Flex'

export interface MenuItemProps {
  title: string
  children: React.ReactNode
}

const MenuItem = ({ title,  children }: MenuItemProps) => {
  const node = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      console.log(node.getBoundingClientRect())
      setHeight(node.getBoundingClientRect().height);
    }
  }, [isOpen])

  useEffect(() => {
    const getBoundingClientRect = get(node, 'current.getBoundingClientRect')
    if (getBoundingClientRect) {
      setHeight(getBoundingClientRect().height)
    }
  })

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <Container height={height} isOpen={isOpen}>
      <Header flex={1} justify="between" onClick={handleClick}>
        <h3>{title}</h3>
      </Header>
      <div ref={measuredRef}>
        {children}
      </div>
    </Container>
  )
}

export default MenuItem

const Container = styled.div<{ isOpen: boolean; height: number }>`
  background: ${COLORS.black};
  height: ${({ isOpen, height }) => (isOpen ? `${height + 48}px` : '48px')};
  overflow: hidden;
  transition: height 0.2s;
  `
  // overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

const Header = styled(Flex)`
  background: ${COLORS.black};
  height: 48px;
  padding: 12px;
  width: 100%;
  color: white;
  cursor: pointer;
`
