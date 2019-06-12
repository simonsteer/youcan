import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  TransitionEvent,
} from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Flex from './Flex'
import { FlexProps } from './Flex/Flex'

export interface ExpandableRenderProps {
  setIsOpen: (isOpen: boolean) => void
  toggleIsOpen: () => void
  isOpen: boolean
  setContentHeight: (height: number) => void
  contentHeight: number
}

type ExpandableChild =
  | React.ReactNode
  | ((renderProps: ExpandableRenderProps) => React.ReactNode)

export interface ExpandableProps extends FlexProps {
  children: ExpandableChild
  closedHeight?: number
  closeOnBlur?: boolean
  onOpen?: (diff: number) => void
  onClose?: (diff: number) => void
  zIndex?: number
  title?: ExpandableChild
  startOpen?: boolean
}

const Expandable = ({
  children,
  closeOnBlur = false,
  closedHeight = 0,
  title,
  onOpen = () => {},
  onClose = () => {},
  startOpen = false,
  ...restProps
}: ExpandableProps) => {
  const root = useRef(null)
  const [isOpen, _setIsOpen] = useState(startOpen)
  const [hasOpened, setHasOpened] = useState(startOpen)
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
      column
      ref={root}
      hasOpened={hasOpened}
      contentHeight={contentHeight || 0}
      closedHeight={closedHeight || titleHeight}
      isOpen={isOpen}
      onTransitionEnd={handleTransitionEnd}
      {...restProps}
    >
      <Flex
        column
        ref={titleRef}
        onClick={
          typeof title === 'function' ? undefined : renderProps.toggleIsOpen
        }
      >
        {typeof title === 'function' ? title(renderProps) : title}
      </Flex>
      <Flex column ref={contentRef}>
        {typeof children === 'function' ? children(renderProps) : children}
      </Flex>
    </ExpandableContainer>
  )
}

export default Expandable

const ExpandableContainer = styled(Flex)<{
  isOpen: boolean
  closedHeight: number
  contentHeight: number
  hasOpened: boolean
}>`
  ${({ isOpen, contentHeight, hasOpened, closedHeight, zIndex }) => `
position: relative;    
    width: 100%;
    height: ${isOpen ? `${contentHeight}px` : `${closedHeight}px`};
    overflow: ${hasOpened && isOpen ? 'visible' : 'hidden'};
    transition: height 0.2s;
    `}
`
