import React, { useState } from 'react'
import Flex from './Flex'
import { FlexProps } from './Flex/Flex'
import { Arrow, DropdownArrowProps } from './Inputs/DropdownSelect'
import useOnClickOutsideElement from '../hooks/useOnClickOutsideElement'

export interface ExpandableRenderProps {
  setIsOpen: (isOpen: boolean) => void
  toggleIsOpen: () => void
  isOpen: boolean
}

type ExpandableChild = | React.ReactNode
  | ((renderProps: ExpandableRenderProps) => React.ReactNode)

export interface ExpandableProps extends FlexProps {
  children: ExpandableChild
  closeOnBlur?: boolean
  onOpen?: () => void
  onClose?: () => void
  title?: ExpandableChild
  startOpen?: boolean
  arrow?: Pick<DropdownArrowProps, 'position' | 'size'>
}

const Expandable = ({
  children,
  closeOnBlur = false,
  title,
  onOpen = () => {},
  onClose = () => {},
  startOpen = false,
  arrow,
  ...restProps
}: ExpandableProps) => {
  const [isOpen, _setIsOpen] = useState(startOpen)
  const rootRef = useOnClickOutsideElement(
    () => isOpen && closeOnBlur && setIsOpen(false)
  )

  const setIsOpen = (isOpen: boolean) => {
    _setIsOpen(isOpen)
    if (isOpen) {
      onOpen()
    } else {
      onClose()
    }
  }

  const renderProps = {
    setIsOpen,
    isOpen,
    toggleIsOpen: () => setIsOpen(!isOpen),
  }

  return (
    <Flex
      ref={rootRef}
      overflow={isOpen ? 'visible' : 'hidden'}
      position="relative"
      column
      {...restProps}
    >
      {typeof title === 'function' ? title(renderProps) : title}
      {!!arrow && <Arrow isOpen={isOpen} {...arrow} />}
      {!!isOpen
        && (typeof children === 'function' ? children(renderProps) : children)}
    </Flex>
  )
}

export default Expandable
