import React, { useState } from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import Flex from '../Flex'
import { COLORS } from '../constants'
import Expandable from '../Expandable'
import { Paragraph } from '../Text'

export interface DropdownSelectProps<T extends (n: string) => any> {
  options: { value: string; label: string }[]
  defaultValue?: string
  onChange: (value: ReturnType<T>) => void
  transformValue?: T
}

export const DropdownSelect = <F extends (n: string) => any>({
  options,
  defaultValue,
  onChange,
  transformValue,
}: DropdownSelectProps<F>) => {
  const [items, setItems] = useState(
    sortBy(options, ({ value }) => value !== defaultValue)
  )

  const handleChange = (isOpen: boolean, val: string) => {
    if (isOpen) {
      const nextValue = transformValue ? transformValue(val) : val
      onChange(nextValue)
      setItems(sortBy(options, ({ value }) => value !== val))
    }
  }

  return (
    <Flex height="20px" flex={1} overflow="visible">
      <Expandable closedHeight={20} closeOnBlur>
        {({ setIsOpen, isOpen }) =>
          items.map(({ value, label }, index) => (
            <DropdownText
              isOpen={isOpen}
              size="sm"
              height="20px"
              padding="0 20px 0 0"
              key={`dropdown-item-${index}`}
              cursor="pointer"
              align="center"
              justify="end"
              onClick={() => {
                handleChange(isOpen, value)
                setIsOpen(!isOpen)
              }}
            >
              {index === 0 && (
                <Arrow
                  isOpen={isOpen}
                  size={6}
                  position={{ top: 6, right: 5 }}
                />
              )}
              {label}
            </DropdownText>
          ))
        }
      </Expandable>
    </Flex>
  )
}

export interface DropdownArrowProps {
  size: number | string
  isOpen: boolean
  position?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
}

export const Arrow = styled.div<DropdownArrowProps>`
  ${({ size, isOpen, position = {} }) => {
    const dimensions =
      typeof size === 'number'
        ? `width: ${size}px; height: ${size}px;`
        : `width: ${size}; height: ${size};`

    return `
      pointer-events: none;
      ${dimensions}
      transform: rotate(${isOpen ? 0 : 90}deg);
      ${position.top ? `top: ${position.top}px;` : ''}
      ${position.right ? `right: ${position.right}px;` : ''}
      ${position.bottom ? `bottom: ${position.bottom}px;` : ''}
      ${position.left ? `left: ${position.left}px;` : ''}
      clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      position: absolute;
      transition: transform 0.2s, background-color 0.2s;
      background: ${COLORS.white};
      `
  }}
`

const DropdownText = styled(Paragraph)<{ isOpen: boolean }>`
  background: ${({ isOpen }) => (isOpen ? COLORS.grey : COLORS.black)};
  color: ${COLORS.white};
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background: ${({ isOpen }) => (isOpen ? COLORS.white : COLORS.grey)};
    color: ${({ isOpen }) => (isOpen ? COLORS.black : COLORS.white)};
    ${Arrow} {
      background: ${({ isOpen }) => (isOpen ? COLORS.black : COLORS.white)};
    }
  }
`
