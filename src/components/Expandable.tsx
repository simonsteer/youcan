import React, { useState, useRef, useEffect, useCallback, TransitionEvent, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { COLORS } from './constants'
import Flex from './Flex'

export interface ExpandableProps {
  children: (setIsOpen: Dispatch<SetStateAction<boolean>>, isOpen: boolean) => React.ReactNode
  closedHeight?: number
  showArrow?: boolean
  absolute?: boolean
  closeOnBlur?: boolean
  startOpen?: boolean
}

const Expandable = ({ children, closedHeight = 0, startOpen = false, showArrow = false, closeOnBlur = false }: ExpandableProps) => {
  const root = useRef(null)
  const [isOpen, setIsOpen] = useState(startOpen)
  const [hasOpened, setHasOpened] = useState(false)
  const [height, setHeight] = useState(0)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, [isOpen])

  useEffect(() => {
    const handler: EventListener = (e) => {
      if (!closeOnBlur) {
        return
      }

      if (!root || !root.current) {
        return
      }

      if (!root.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  const handleClick = () => setIsOpen(!isOpen)

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === 'height') {
        setHasOpened(isOpen)
    }
  }

  return (
    <ExpandableContainer ref={root} hasOpened={hasOpened} height={height} closedHeight={closedHeight} isOpen={isOpen} onTransitionEnd={handleTransitionEnd}>
        <div ref={measuredRef}>
        {children(setIsOpen, isOpen)}
      </div>
          {!!showArrow && <Arrow
            onClick={() => setIsOpen(!isOpen)}
            rotate={isOpen ? -135 : -45}
          />}
    </ExpandableContainer>
  )
}

export default Expandable

const ExpandableContainer = styled.div<{ isOpen: boolean; closedHeight: number; height: number; hasOpened: boolean }>`${({ isOpen, height, hasOpened, closedHeight }) => `
position: relative;    
background: ${COLORS.black};
    height: ${isOpen ? `${height}px` : `${closedHeight}px`};
    overflow: ${(hasOpened && isOpen ? 'visible' : 'hidden')};
    transition: height 0.2s;
    `}
`

interface ArrowProps {
  rotate?: number
  size?: number
  onClick?: () => void
}
const Arrow = styled.button<ArrowProps>`
  ${({ size = 2, rotate = 0 }) => `
    transition: transform 0.2s;
    width: 0;
    height: 0;
    padding: 0px;
    position: absolute;
    top: 4px;
    right: 2px;
    border-top: ${size}px solid ${COLORS.white};
    border-left: ${size}px solid ${COLORS.white};
    border-bottom: ${size}px solid transparent;
    border-right: ${size}px solid transparent;
    transform: rotate(${rotate}deg);
  `}
`