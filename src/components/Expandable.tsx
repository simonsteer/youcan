import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  TransitionEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import styled from 'styled-components'
import { COLORS } from './constants'

export interface ExpandableProps {
  children: (renderProps: {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    toggleIsOpen: () => void
    isOpen: boolean
    setHeight: Dispatch<SetStateAction<number>>
    height: number
  }) => React.ReactNode
  closedHeight?: number
  closeOnBlur?: boolean
  startOpen?: boolean
}

const Expandable = ({
  children,
  closedHeight = 0,
  startOpen = false,
  closeOnBlur = false,
}: ExpandableProps) => {
  const root = useRef(null)
  const [isOpen, setIsOpen] = useState(startOpen)
  const [hasOpened, setHasOpened] = useState(false)
  const [height, setHeight] = useState(0)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])

  useEffect(() => {
    const handler: EventListener = e => {
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
  })

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === 'height') {
      setHasOpened(isOpen)
    }
  }

  return (
    <ExpandableContainer
      ref={root}
      hasOpened={hasOpened}
      height={height}
      closedHeight={closedHeight}
      isOpen={isOpen}
      onTransitionEnd={handleTransitionEnd}
    >
      <div ref={measuredRef}>
        {children({
          setIsOpen,
          isOpen,
          toggleIsOpen: () => setIsOpen(!isOpen),
          setHeight,
          height,
        })}
      </div>
    </ExpandableContainer>
  )
}

export default Expandable

const ExpandableContainer = styled.div<{
  isOpen: boolean
  closedHeight: number
  height: number
  hasOpened: boolean
}>`
  ${({ isOpen, height, hasOpened, closedHeight }) => `
position: relative;    
background: ${COLORS.black};
    width: 100%;
    height: ${isOpen ? `${height}px` : `${closedHeight}px`};
    overflow: ${hasOpened && isOpen ? 'visible' : 'hidden'};
    transition: height 0.2s;
    `}
`
