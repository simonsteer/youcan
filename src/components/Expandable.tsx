import React, {
  useState,
  useRef,
  useEffect,
  TransitionEvent,
  useLayoutEffect,
} from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

export interface ExpandableRenderProps {
  setIsOpen: (isOpen: boolean) => void
  toggleIsOpen: () => void
  isOpen: boolean
  setContentHeight: (height: number) => void
  contentHeight: number
}

export interface ExpandableProps {
  children: React.ReactNode | ((renderProps: ExpandableRenderProps) => React.ReactNode)
  closedHeight?: number
  closeOnBlur?: boolean
  startOpen?: boolean
  onOpen?: (diff: number) => void
  onClose?: (diff: number) => void
  zIndex?: number
  title?: React.ReactNode
}

const Expandable = ({
  children,
  startOpen = false,
  closeOnBlur = false,
  closedHeight = 0,
  title,
  onOpen = () => {},
  onClose = () => {},
  zIndex,
}: ExpandableProps) => {
  const root = useRef(null)
  const [isOpen, _setIsOpen] = useState(startOpen)
  const [hasOpened, setHasOpened] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [canSetContentHeight, setCanSetContentHeight] = useState(true)

  const titleRef = useRef(null)
  const contentRef = useRef(null)

  const setIsOpen = (isOpen: boolean) => {
    _setIsOpen(isOpen)
    let diff = contentHeight - titleHeight
    diff = isOpen ? diff : diff * -1
    if (isOpen) {
      onOpen(diff)
    } else {
      onClose(diff)
    }
  }

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
      e.stopPropagation()
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  })

  const _titleHeight = get(titleRef.current, 'offsetHeight')
  const _contentHeight = get(contentRef.current, 'offsetHeight')
  useLayoutEffect(() => {
    setTitleHeight(_titleHeight)
    if (canSetContentHeight) {
      setContentHeight(_contentHeight + _titleHeight)
    }
  }, [_titleHeight, _contentHeight, canSetContentHeight])

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === 'height') {
      setHasOpened(isOpen)
      setCanSetContentHeight(!canSetContentHeight)
    }
  }

  const renderProps = {
    setIsOpen,
    isOpen,
    toggleIsOpen: () => setIsOpen(!isOpen),
    setContentHeight,
    contentHeight,
  }

  return (
    <ExpandableContainer
      ref={root}
      hasOpened={hasOpened}
      height={contentHeight || 0}
      closedHeight={closedHeight || titleHeight}
      isOpen={isOpen}
      onTransitionEnd={handleTransitionEnd}
      zIndex={zIndex}
    >
      <div ref={titleRef} onClick={renderProps.toggleIsOpen}>
        {title}
      </div>
      <div ref={contentRef}>
        {typeof children === 'function' ? children(renderProps) : children}
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
