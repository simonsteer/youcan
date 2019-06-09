import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  TransitionEvent,
} from 'react'
import styled from 'styled-components'

export interface ExpandableRenderProps {
  setIsOpen: (isOpen: boolean) => void
  toggleIsOpen: () => void
  isOpen: boolean
  setContentHeight: (height: number) => void
  contentHeight: number
}

export interface ExpandableProps {
  children: (renderProps: ExpandableRenderProps) => React.ReactNode
  closedHeight?: number
  closeOnBlur?: boolean
  startOpen?: boolean
  onOpen?: (diff: number) => void
  onClose?: (diff: number) => void
  onChangeContentHeight?: (diff: number) => void
  zIndex?: number
}

const Expandable = ({
  children,
  closedHeight = 0,
  startOpen = false,
  closeOnBlur = false,
  onOpen = () => {},
  onClose = () => {},
  onChangeContentHeight = () => {},
  zIndex,
}: ExpandableProps) => {
  const root = useRef(null)
  const [isOpen, _setIsOpen] = useState(startOpen)
  const [hasOpened, setHasOpened] = useState(false)
  const [contentHeight, _setContentHeight] = useState(0)

  const setIsOpen = (isOpen: boolean) => {
    _setIsOpen(isOpen)
    if (isOpen) {
      onOpen(contentHeight - closedHeight)
    } else {
      onClose(-contentHeight + closedHeight)
    }
  }

  const setContentHeight = (height: number) => {
    const diff = height - contentHeight
    onChangeContentHeight(diff)
    _setContentHeight(height)
  }

  const measuredContentRef = useCallback(node => {
    if (node !== null) {
      setContentHeight(node.getBoundingClientRect().height)
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
      height={contentHeight}
      closedHeight={closedHeight}
      isOpen={isOpen}
      onTransitionEnd={handleTransitionEnd}
      zIndex={zIndex}
    >
      <div ref={measuredContentRef}>
        {children({
          setIsOpen,
          isOpen,
          toggleIsOpen: () => setIsOpen(!isOpen),
          setContentHeight,
          contentHeight,
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
  zIndex?: number
}>`
  ${({ isOpen, height, hasOpened, closedHeight, zIndex }) => `
position: relative;    
    width: 100%;
    height: ${isOpen ? `${height}px` : `${closedHeight}px`};
    overflow: ${hasOpened && isOpen ? 'visible' : 'hidden'};
    transition: height 0.2s;
    ${zIndex ? `z-index: ${zIndex};` : ''}
    `}
`
